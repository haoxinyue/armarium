/**
 * Created by Administrator on 2017/8/3.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    changeHeaderRight,
    fetchPmCaseList
} from '../../redux/actions'
import {PullToRefresh, ListView, SearchBar, Drawer, Tabs, Toast, WingBlank, Button} from 'antd-mobile'
import RadioGroup from '../../components/RadioGroup'
import './InspectionCaseList.less'
import './listItem.less'
import {addRippleEffect, runScanner} from "../../utils";

class PmCaseItem extends Component {

    // 查看详情
    goDetail = (item) => {
        this.props.history.push(`/pmCaseEdit/${item.deviceId}`)
    }


    render() {
        const itemData = this.props.list || {};
        const emptyImage = require("../../assets/img/empty.png");

        function getStateName(state) {
            switch (state) {
                case 10:
                    return "待巡检";
                case 20:
                    return "已取消";
                case 30:
                    return "巡检中";
                case 50:
                    return "已关闭";
                default:
                    return "无";
            }

        }

        return (
            <li className="install-case-list-item"
                onTouchStart={(e) => {
                    let touch = e.touches[0]
                    addRippleEffect(e.currentTarget, touch.pageX, touch.pageY)
                }}
                onClick={this.goDetail.bind(this, itemData)}>
                <WingBlank>
                    <div className="item-name"><span className="icon-device"></span> <span
                        style={{verticalAlign: "middle"}}>{itemData.deviceName}({itemData.deviceId})</span></div>
                    <div className="item-desc">

                        <div className="item-desc-left">
                            <div>
                                <span className="key">所属医院</span>：
                                <span className="value">{itemData.hospital}</span>
                            </div>
                            <div>
                                <span className="key">所属部门</span>：
                                <span className="value">{itemData.deptName}</span>
                            </div>
                        </div>

                    </div>
                </WingBlank>

            </li>
        )
    }
}


class PmCaseList extends Component {
    constructor(props) {
        super(props)

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        const dataSourceDeviceList = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.rData = [];

        this.state = {
            dataSource,
            dataSourceDeviceList,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight - 88 - 90,
            useBodyScroll: false,
            openFilter: false,
            searchValue: '',
            pageIndex: 0,
            hasMore: false,
            tabIndex: 0
        }

        this.queryPageData = this.queryPageData.bind(this)
    }

    createNewCase(deviceId) {
        // this.props.history.push({pathname: "/inspectionCaseEdit/123"})
        if (deviceId) {
            this.props.history.push({pathname: `/pmCaseEdit/${deviceId}`})
        } else {
            runScanner().then((result) => {
                    let deviceId = /\[(\S+)\]/.exec(result.text)
                    deviceId = deviceId && deviceId[1]
                    if (deviceId) {
                        this.props.history.push({pathname: `/pmCaseEdit/${deviceId}`})
                    } else {
                        // alert('无效的二维码')
                    }
                }, (error) => {
                    alert("请重新扫描");
                }
            )
        }


    }


    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(changeHeaderRight([
            <Button key="0" size="small" type="primary" onClick={this.createNewCase.bind(this,null)}>开始保养</Button>
        ]))


        this.onRefresh()
    }

    componentWillUnmount() {

    }

    /**
     * 搜索text
     * @param searchValue
     */
    handleChange = (searchValue) => {
        this.setState({
            searchValue
        })
    }

    onOpenChange = (...args) => {
        this.setState({openFilter: !this.state.openFilter});
    }

    /**
     * 调用搜索按钮
     */
    handleSubmit = () => {
        this.onRefresh()
    }

    queryPageData(clear, tabIndex) {
        const {dispatch, userInfo} = this.props
        const {searchValue} = this.state
        const nextPage = (clear ? 0 : (this.state.pageIndex + 1))
        this.setState({refreshing: !!clear, pageIndex: nextPage, isLoading: true});

        let queryData = {
            pageIndex: nextPage,
            assigneeUserId: userInfo.userId
        };
        if (searchValue) {
            queryData.deviceName = searchValue
        }


        dispatch(fetchPmCaseList(queryData)).then((res) => {
            // Toast.info("success");
            if(!res.error){
                Toast.hide();
                this.rData = clear ? [] : this.rData;

                const listdata = res.payload.data || [];
                console.log(JSON.stringify(listdata))
                listdata.forEach((item) => {
                    this.rData.push(item)
                });

                let dataSource = this.state.dataSource.cloneWithRows(this.rData);

                this.setState({
                    dataSource,
                    refreshing: false,
                    isLoading: false,
                    hasMore: listdata.length > 0
                });
            }else{
                if (clear) {
                    let dataSource = this.state.dataSource.cloneWithRows([]);
                    this.setState({
                        dataSource,
                        refreshing: false,
                        isLoading: false,
                        hasMore: false
                    });
                } else {
                    this.setState({
                        refreshing: false,
                        isLoading: false,
                        hasMore: false
                    });
                }
                Toast.hide()
            }
        })


    }


    onRefresh = () => {
        this.queryPageData(true, this.state.tabIndex)
    };


    onEndReached = (event) => {

        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }

        this.queryPageData(false, this.state.tabIndex)

    };

    render() {



        const display = this.state.openFilter ? 'block' : 'none'
        // 参会状态props
        const partProps = {
            name: 'part',
            defaultValue: '所有',
            data: ['所有', '正常', '故障'],
            onChange: () => {
                this.setState({
                    openFilter: false
                })
                this.onRefresh()
            }
        }


        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );

        const sidebar =
            <div className="side-content">
                <ul className="filter-list">
                    <li className="filter-list-item">
                        <h6 className="filter-list-item-title">设备状态</h6>
                        <RadioGroup {...partProps} />
                    </li>
                </ul>
            </div>;

        return (
            <Drawer
                className="install-case-list"
                enableDragHandle
                contentStyle={{}}
                sidebar={sidebar}
                position="right"
                open={this.state.openFilter}
                onOpenChange={this.onOpenChange}
            >

                <section className="dataList-wrap">

                    <SearchBar className="search-box" placeholder="请输入设备名称" value={this.state.searchValue}
                               onChange={this.handleChange}
                               onSubmit={this.handleSubmit}/>
                    <div className="dataList-container2" id="J_Scroll">
                        <div className="scroll-hook">
                            <ListView
                                className="dataList-list"
                                key={'0'}
                                ref={el => this.lv = el}
                                dataSource={this.state.dataSource}

                                renderRow={(rowData, sectionID, rowID) => (
                                    <PmCaseItem key={sectionID + '_' + rowID}
                                                history={this.props.history}
                                                list={rowData}
                                    />
                                )}
                                renderFooter={() => (<div style={{padding: 30, textAlign: 'center'}}>
                                    {this.state.isLoading ? '加载中...' : (this.state.dataSource.getRowCount()>0?'':'暂无数据')}
                                </div>)}
                                renderSeparator={separator}
                                useBodyScroll={this.state.useBodyScroll}
                                style={this.state.useBodyScroll ? {} : {
                                    height: this.state.height,
                                    border: '1px solid #ddd',
                                    margin: '5px 0',
                                }}
                                pullToRefresh={<PullToRefresh
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.onRefresh}
                                />}
                                onEndReached={this.onEndReached}
                                pageSize={8}
                            />

                        </div>
                    </div>

                    <div className="mask" style={{display}} onClick={this.onOpenChange}>
                    </div>
                </section>


            </Drawer>
        )
    }
}

const mapStateToProps = (state) => {
    const {filter} = state.pmCase;
    const {userInfo} = state.auth;
    return {
        searchWord: filter.searchWord,
        userInfo
    }
}

export default connect(mapStateToProps)(PmCaseList)