/**
 * Created by Administrator on 2017/8/10.
 */
import React, {Component} from 'react'
import {List, Button, WhiteSpace,WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'

import './listItem.less'

import {addRippleEffect} from '../../utils'

class DeviceListItem extends Component {

    // 确认参会
    ensurePart = () => {
        this.props.ensurePart()
    }

    // 取消参会
    cancelPart = () => {
        this.props.cancelPart()
    }

    //签到
    sign = () => {
        this.props.sign()
    }

    // 查看详情
    goDetail = (list) => {
        this.props.history.push(`/deviceDetail/${list.id}`)
    }

    render() {
        const itemData = this.props.list;
        const emptyImage="";
        return (
            <li className="device-list-item"
                onTouchStart={(e)=>{
                    let touch = e.touches[0]
                    addRippleEffect(e.currentTarget, touch.pageX, touch.pageY)
                }}
                onClick={this.goDetail.bind(this, itemData)}>
                <WingBlank>
                <div className="item-name"> <span className="icon-device"></span> <span style={{verticalAlign:"middle"}}>{itemData.DeviceName}</span></div>

                <div className="item-desc">
                    <div className="item-desc-right">
                        <div className="item-image" style={{
                            backgroundImage:"url("+(itemData.Picture1 || emptyImage)+")"
                        }}></div>
                    </div>
                    <div className="item-desc-left">
                        <div>
                            <span className="key">设备型号</span>：
                            <span className="value">{itemData.DeviceModel}</span>
                        </div>
                        {/*<div>
                            <span className="key">设备类型</span>：
                            <span className="value">{itemData.name}</span>
                        </div>*/}
                        <div>
                            <span className="key">设备序号</span>：
                            <span className="value">{itemData.SerialNumber}</span>
                        </div>
                        <div>
                            <span className="key">二维码号</span>：
                            <span className="value">{itemData.QRCode}</span>
                        </div>
                        <div>
                            <span className="key">设备状态</span>：
                            <span className="value warning">{itemData.DeviceState=="1"?"正常":"故障"}</span>
                        </div>
                    </div>

                </div>
                </WingBlank>

            </li>
        )
    }
}

export default connect()(DeviceListItem)
