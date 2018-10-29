/**
 * Created by Administrator on 2017/8/10.
 */
import React, {Component} from 'react'
import {List, Button, WhiteSpace, WingBlank, Flex,Accordion} from 'antd-mobile'
import {connect} from 'react-redux'

import './listItem.less'

import {addRippleEffect} from '../../utils'

class DepartmentDeviceListItem extends Component {


    state = {
        deviceList: [],
        hasMore: true,
        loading: false,
        pagination:{
            pageIndex:0,
            pageSize:10,
            total:0
        }
    };

    // 查看详情
    goDetail = (list) => {

    };

    loadMoreDevice(itemData) {
        this.setState({
            hasMore:false
        })
    }
    onChange(){

    }

    render() {
        const itemData = this.props.list || {};
        const onClick = this.props.onClick || this.goDetail;
        const header = <Flex
            onTouchStart={(e) => {
                let touch = e.touches[0]
                addRippleEffect(e.currentTarget, touch.pageX, touch.pageY)
            }}>
            <Flex.Item>{itemData.caseSubject||'无主题'}</Flex.Item>
            <Flex.Item>{itemData.status}</Flex.Item>
        </Flex>;
        return (
            <li className="dept-device-list-item">
                <Accordion  className="my-accordion" onChange={this.onChange}>
                    <Accordion.Panel header={header}>
                        <List className="my-list">

                            {
                                this.state.deviceList.map((deviceData)=><List.Item className="device-list-item">
                                    <WingBlank>
                                        <div className="item-name"> <span className="icon-device"></span> <span style={{verticalAlign:"middle"}}>{deviceData.deviceName}</span></div>

                                        <div className="item-desc">
                                            {/*<div className="item-desc-right">
                                                <div className="item-image" style={{
                                                    backgroundImage:"url("+(deviceData.picture1 || emptyImage)+")"
                                                }}>

                                                </div>
                                            </div>*/}
                                            <div className="item-desc-left">
                                                <div>
                                                    <span className="key">设备型号</span>：
                                                    <span className="value">{itemData.deviceModel}</span>
                                                </div>
                                                <div>
                                                    <span className="key">盘点状态</span>：
                                                    <span className="value">{itemData.stocktakingStatus}</span>
                                                </div>

                                            </div>

                                        </div>
                                    </WingBlank>
                                </List.Item>)
                            }

                            {this.state.hasMore && <List.Item style={{textAlign:'center' }} ><Button
                                onClick={this.loadMoreDevice.bind(this, itemData)}>{this.state.loading?"加载中...":"加载更多"}</Button></List.Item>}

                        </List>
                    </Accordion.Panel>
                </Accordion>

            </li>
        )
    }
}

export default DepartmentDeviceListItem
