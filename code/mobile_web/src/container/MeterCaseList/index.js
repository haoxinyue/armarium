/**
 * Created by Administrator on 2017/8/3.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    changeHeaderRight,
    fetchMeterCaseList,
} from '../../redux/actions'
import {PullToRefresh, ListView, SearchBar, Drawer, Tabs, Toast, WingBlank, Button} from 'antd-mobile'
import RadioGroup from '../../components/RadioGroup'
import './StocktakingCaseList.less'
import './listItem.less'
import {addRippleEffect, runScanner} from "../../utils";


class MeterCaseItem extends Component {

    // 查看详情
    goDetail = (list) => {
        this.props.history.push(`/meterCaseEdit/${list.deviceId}`)
    }

    render() {
        const itemData = this.props.list||{};
        const onClick = this.props.onClick || this.goDetail;
        const emptyImage=require("../../assets/img/empty.png");
        return (
            <li className="device-list-item"
                onTouchStart={(e)=>{
                    let touch = e.touches[0]
                    addRippleEffect(e.currentTarget, touch.pageX, touch.pageY)
                }}
                onClick={onClick.bind(this, itemData)}>
                <WingBlank>
                    <div className="item-name"> <span className="icon-device"></span> <span style={{verticalAlign:"middle"}}>{itemData.deviceName||''}</span></div>

                    <div className="item-desc">

                        <div className="item-desc-left">

                            <div>
                                <span className="key">委派人</span>：
                                <span className="value">{itemData.assigneeUserName}</span>
                            </div>
                            <div>
                                <span className="key">计量数据</span>：
                                <span className="value warning">{itemData.meteringData}</span>
                            </div>
                            <div>
                                <span className="key">计量状态</span>：
                                <span className="value warning">{itemData.meteringTime?`已关闭 (${itemData.meteringTime})`:'待计量'}</span>
                            </div>
                        </div>

                    </div>
                </WingBlank>

            </li>
        )
    }
}


class MeterCaseList extends Component {
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
            pageSize: 10,
            hasMore: false,
            tabIndex: 0
        }

        this.queryPageData = this.queryPageData.bind(this)
    }

    createNewCase(deviceId) {
        // this.props.history.push({pathname: "/inspectionCaseEdit/123"})
        if (deviceId) {
            this.props.history.push({pathname: `/meterCaseEdit/${deviceId}`})
        } else {
            runScanner().then((result) => {
                    let deviceId = /\[(\S+)\]/.exec(result.text)
                    deviceId = deviceId && deviceId[1]
                    if (deviceId) {
                        this.props.history.push({pathname: `/meterCaseEdit/${deviceId}`})
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
            <Button key="0" size="small" type="primary" onClick={this.createNewCase.bind(this, null)}>开始计量</Button>
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
            pageSize:this.state.pageSize,
            assigneeUserId: userInfo.userId
        };
        if (searchValue) {
            queryData.deviceName = searchValue
        }


        dispatch(fetchMeterCaseList(queryData)).then((res) => {

            if (res.error) {
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
                return;
            }

            this.rData = clear ? [] : this.rData;
            const listdata = res.payload.data || [];
            listdata.forEach((item) => {
                this.rData.push(item)
            });

            let dataSource = this.state.dataSource.cloneWithRows(this.rData);
            console.log(this.state.pageSize)
            console.log(nextPage)

            this.setState({
                dataSource,
                refreshing: false,
                isLoading: false,
                hasMore: res.payload.recordCount > (nextPage+1)*this.state.pageSize
            });

        })


    }


    onRefresh = () => {
        this.queryPageData(true)
    };


    onEndReached = (event) => {

        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading || !this.state.hasMore) {
            return;
        }

        this.queryPageData(false)

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

                    {/*<SearchBar className="search-box" placeholder="请输入设备名称" value={this.state.searchValue}
                               onChange={this.handleChange}
                               onSubmit={this.handleSubmit}/>*/}
                    <div className="dataList-container2" id="J_Scroll">
                        <div className="scroll-hook">
                            <ListView
                                className="dataList-list"
                                key={'0'}
                                ref={el => this.lv = el}
                                dataSource={this.state.dataSource}

                                renderRow={(rowData, sectionID, rowID) => (
                                    <MeterCaseItem key={sectionID + '_' + rowID}
                                                              history={this.props.history}
                                                              onClick={this.props.onDeviceClick}
                                                              list={rowData}
                                    />
                                )}
                                renderFooter={() => (this.state.isLoading &&<div style={{padding: 30, textAlign: 'center'}}>
                                    {this.state.isLoading ? '加载中...' : ''}
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
                                pageSize={10}
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
    const {userInfo} = state.auth;
    return {
        userInfo
    }
}

export default connect(mapStateToProps)(MeterCaseList)