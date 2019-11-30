/**
 * Created by Administrator on 2017/8/3.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    changeHeaderRight,
    getRepairList
} from '../../redux/actions'
import {PullToRefresh, ListView, SearchBar, Drawer, Toast, Picker, List} from 'antd-mobile'
import RadioGroup from '../../components/RadioGroup'
import RepairListItem from '../../components/RepairListItem'
import style from './deviceList.less'


class Devices extends Component {
    constructor(props) {
        super(props)

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.rData = [];

        this.state = {
            dataSource,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight - 88 - 90,
            useBodyScroll: false,
            openFilter: false,
            searchValue: '',
            pageIndex: 0,
            hasMore: false,

            query: {
                state: null,
                priority: null
            }
        }

        this.queryPageData = this.queryPageData.bind(this)
    }


    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(changeHeaderRight([
            <div key="0" className="filter-btn" onClick={this.onOpenChange}>
                <i className="filter-bg"></i>
                <span>筛选</span>
            </div>
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

    queryPageData(clear) {
        const {dispatch, userInfo, route} = this.props
        const {query} = this.state
        const {state, priority} = query
        const nextPage = (clear ? 0 : (this.state.pageIndex + 1))
        this.setState({refreshing: !!clear, pageIndex: nextPage, isLoading: true});

        let params = {
            pageIndex: nextPage,
            deviceName: this.state.searchValue,
            // assigneeUserId: userInfo.userId
        }
        if (route.path === '/repairsMy') {
            params.assigneeUserId = userInfo.userId
        } else if (route.path === '/repairsMyReport') {
            params.reporterUserId = userInfo.userId
        }

        if (state) {
            params.caseState = state;
        }

        if (priority) {
            params.priority = priority
        }

        try {


            dispatch(getRepairList(params)).then((res) => {
                // Toast.info("success")

                if (!res.error) {
                    Toast.hide()
                    this.rData = clear ? [] : this.rData;
                    const listdata = res.payload.data || [];
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
                } else {

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
        } catch (e) {
            // alert(JSON.stringify(e))
        }
    }


    onRefresh = () => {
        this.queryPageData(true)
    };


    onEndReached = (event) => {

        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }

        this.queryPageData(false)

    };

    hideFilter() {
        this.setState({
            openFilter: false
        })
    }

    render() {
        const {route} = this.props
        const display = this.state.openFilter ? 'block' : 'none'
        // 参会状态props
        const partProps = {
            name: 'priority',
            defaultValue: -1,
            data: [
                {
                    label: '全部',
                    value: -1,
                },
                {
                    label: '一般',
                    value: 1,
                },
                {
                    label: '重要',
                    value: 2,
                },
                {
                    label: '紧急',
                    value: 3,
                }],
            onChange: (v) => {
                this.setState({
                    query: {
                        ...this.state.query,
                        priority: v == -1 ? undefined : Number(v)
                    }
                }, () => {
                    this.onRefresh()
                    this.hideFilter()
                })

            }
        }

        const stateProps = {
            name: 'state',
            defaultValue: -1,
            data: [
                {
                    label: '全部',
                    value: -1,
                },
                {
                    label: '待处理',
                    value: 10,
                },
                {
                    label: '已取消',
                    value: 20,
                },
                {
                    label: '处理中',
                    value: 30,
                },
                {
                    label: '已完成',
                    value: 40,
                },
                {
                    label: '已关闭',
                    value: 50,
                }
            ],
            onChange: (v) => {
                this.setState({
                    query: {
                        ...this.state.query,
                        state: v == -1 ? undefined : Number(v)
                    }
                }, () => {
                    this.onRefresh()
                    this.hideFilter()
                })

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
                        <h6 className="filter-list-item-title">报修状态</h6>
                        <RadioGroup {...stateProps} />
                    </li>
                    <li className="filter-list-item">
                        <h6 className="filter-list-item-title">重要性</h6>
                        <RadioGroup {...partProps} />
                    </li>
                </ul>
            </div>;


        return (
            <Drawer
                className="device-list"
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
                    <div className="dataList-container" id="J_Scroll">
                        <div className="scroll-hook">
                            <ListView
                                className="dataList-list"
                                key={'0'}
                                ref={el => this.lv = el}
                                dataSource={this.state.dataSource}

                                renderRow={(rowData, sectionID, rowID) => (
                                    <RepairListItem
                                        route={route}
                                        key={sectionID + '_' + rowID}
                                        history={this.props.history}
                                        list={rowData}
                                    />
                                )}
                                renderFooter={() => (<div style={{padding: 30, textAlign: 'center'}}>
                                    {this.state.isLoading ? '加载中...' : (this.state.dataSource.length?'':'暂无数据')}
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
    const {filter} = state.device
    const {userInfo} = state.auth;
    return {
        searchWord: filter.searchWord,
        userInfo
    }
}

export default connect(mapStateToProps)(Devices)