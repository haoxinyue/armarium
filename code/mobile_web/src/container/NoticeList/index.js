/**
 * Created by Administrator on 2017/8/3.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    fetchNoticeList,
    delNoticeList
} from '../../redux/actions'
import {PullToRefresh, ListView, SearchBar, Drawer, Tabs, Toast, WingBlank, Button} from 'antd-mobile'
import './NoticeList.less'
import './listItem.less'
import {addRippleEffect} from "../../utils";

class NoticeItem extends Component {




    render() {
        const itemData = this.props.list || {};


        return (
            <li className="install-case-list-item"
                key={itemData.noticeId}
                onTouchStart={(e) => {
                    let touch = e.touches[0]
                    addRippleEffect(e.currentTarget, touch.pageX, touch.pageY)
                }}
                onClick={this.props.onClick}>
                <WingBlank>
                    <div className="item-name"><span className="icon-device"></span> <span
                        style={{verticalAlign: "middle"}}>{itemData.name}</span></div>
                    <div className="item-desc">

                        <div className="item-desc-left">
                            {itemData.message}
                        </div>

                    </div>
                </WingBlank>

            </li>
        )
    }
}


class NoticeList extends Component {
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

    // 查看详情
    goDetail = (item) => {
        // this.props.history.push(`/inspection-case-edit/${item.caseId}`)
        const {dispatch,history} = this.props;
        dispatch(delNoticeList({
            noticeId:item.noticeId
        }));
        switch (item.type) {
            case "install":
                history.push(`/installCaseList`);
                break;
            case "inspection":
                history.push(`/inspectionCaseList`);
                break;
            case "pm":
                history.push(`/pmCaseList`);
                break;
            case "repair":
                history.push(`/repairs`);
                break;
            case "stocktaking":
                history.push(`/stocktakingCaseList`);
                break;
        }

    }


    componentDidMount() {

        this.onRefresh()
    }

    componentWillUnmount() {
        fetchNoticeList
    }


    queryPageData(clear) {
        const {dispatch, userInfo} = this.props
        dispatch(fetchNoticeList({
            userId: userInfo.userId
        }))

    }


    onRefresh = () => {

        this.queryPageData(true)
    };


    onEndReached = (event) => {
        // this.queryPageData()

    };

    render() {


        const {notice} = this.props


        return (
            <Drawer
                className="install-case-list"
                enableDragHandle
                contentStyle={{}}
                sidebar={<div></div>}
                position="right"
                open={this.state.openFilter}
                onOpenChange={this.onOpenChange}
            >

                <section className="dataList-wrap">
                    <div className="dataList-container2" id="J_Scroll">
                        {
                            notice.list.length?notice.list.map((n) => <NoticeItem key={n.noticeId}
                                                               history={this.props.history}
                                                               onClick={this.goDetail.bind(this,notice.byIds[n])}
                                                               list={notice.byIds[n]}
                            />):<p className={"empty-message"}>暂无消息</p>
                        }
                    </div>

                </section>


            </Drawer>
        )
    }
}

const mapStateToProps = (state) => {
    const notice = state.notice;
    const {userInfo} = state.auth;
    return {
        userInfo,
        notice
    }
}



export default connect(mapStateToProps)(NoticeList)