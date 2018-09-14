/**
 * Created by Administrator on 2017/8/10.
 */
import React, {Component} from 'react'
import {List, Button, WhiteSpace,WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'

import './listItem.less'

import {addRippleEffect} from '../../utils'

class DeviceListItem extends Component {



    // 查看详情
    goDetail = (list) => {
        this.props.history.push(`/deviceDetail/${list.deviceId}`)
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
                <div className="item-name"> <span className="icon-device"></span> <span style={{verticalAlign:"middle"}}>{itemData.deviceName}</span></div>

                <div className="item-desc">
                    <div className="item-desc-right">
                        <div className="item-image" style={{
                            backgroundImage:"url("+(itemData.picture1 || emptyImage)+")"
                        }}>

                        </div>
                    </div>
                    <div className="item-desc-left">
                        <div>
                            <span className="key">设备型号</span>：
                            <span className="value">{itemData.deviceModel}</span>
                        </div>
                        {/*<div>
                            <span className="key">设备类型</span>：
                            <span className="value">{itemData.name}</span>
                        </div>*/}
                        <div>
                            <span className="key">设备序号</span>：
                            <span className="value">{itemData.serialNumber}</span>
                        </div>
                        <div>
                            <span className="key">二维码号</span>：
                            <span className="value">{itemData.qrCode}</span>
                        </div>
                        <div>
                            <span className="key">设备状态</span>：
                            <span className="value warning">{itemData.deviceState=="1"?"正常":"故障"}</span>
                        </div>
                    </div>

                </div>
                </WingBlank>

            </li>
        )
    }
}

export default DeviceListItem
