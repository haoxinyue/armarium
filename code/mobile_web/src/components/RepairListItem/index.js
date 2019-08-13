/**
 * Created by Administrator on 2017/8/10.
 */
import React, {Component} from 'react'
import {List, Button, WhiteSpace, WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'

import moment from 'moment';

import './listItem.less'

import {addRippleEffect} from '../../utils'

class DeviceListItem extends Component {

    // 查看详情
    goDetail = (list) => {
        this.props.history.push(`/repairDetail/${list.caseId}`)
    }

    getCaseStateName(state) {
        const Names = {
            10: "新报修",
            20: "已取消",
            30: "维修中",
            40: "已完成",
            50: "已关闭"
        };

        return Names[state] || "未知"

    }

    getPriorityName(priority) {
        const Names = {
            1: "一般",
            2: "重要",
            3: "紧急",
        };

        return Names[priority] || "未知"

    }

    render() {
        const {route} = this.props;
        let isMyRepairs = route.path === '/repairsMy'
        let isMyReportRepairs = route.path === '/repairsMyReport'

        const itemData = this.props.list || {};
        const emptyImage = require("../../assets/img/empty.png");
        return (
            <li className="repair-list-item"
                onTouchStart={(e) => {
                    let touch = e.touches[0]
                    addRippleEffect(e.currentTarget, touch.pageX, touch.pageY)
                }}
                onClick={this.goDetail.bind(this, itemData)}>
                <WingBlank>
                    <div className="item-name"><span className="icon-device"></span> <span
                        style={{verticalAlign: "middle"}}>{itemData.deviceName}</span></div>

                    <div className="item-desc">
                        <div className="item-desc-right">
                            <div className="item-image" style={{
                                backgroundImage: "url(" + (itemData.caseFilePath || emptyImage) + ")"
                            }}>

                            </div>
                        </div>
                        <div className="item-desc-left">
                            <div>
                                <span className="key">设备Id</span>：
                                <span className="value">{itemData.deviceId}</span>
                            </div>
                            {!isMyReportRepairs && <div>
                                <span className="key">上报人</span>：
                                <span className="value">{itemData.reporterUserName}</span>
                            </div>}

                            <div>
                                <span className="key">当前状态</span>：
                                <span className="value">{this.getCaseStateName(itemData.caseState)}</span>
                            </div>
                            <div>
                                <span className="key">重要程度</span>：
                                <span className="value">{this.getPriorityName(itemData.priority)}</span>
                            </div>
                            <div>
                                <span className="key">所属科室</span>：
                                <span className="value">{(itemData.deptName)}</span>
                            </div>
                            {!isMyReportRepairs && <div>
                                <span className="key">指派工程师</span>：
                                <span className="value">{(itemData.assigneeUserName)}</span>
                            </div>}
                            <div>
                                <span className="key">报修时间</span>：
                                <span
                                    className="value">{moment(itemData.createTime).format("YYYY/MM/DD HH:mm:ss")}</span>
                            </div>
                            {/*<div>
                                <span className="key">备注</span>：
                                <span className="value warning" style={{
                                    height: '2.2em',
                                    display: 'inline-block',
                                    verticalAlign: 'top',
                                    overflow: 'hidden'
                                }}>
                                {itemData.caseRemark}</span>
                            </div>*/}
                        </div>

                    </div>
                </WingBlank>

            </li>
        )
    }
}

export default DeviceListItem
