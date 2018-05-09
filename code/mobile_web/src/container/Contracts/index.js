import React, {Component} from 'react'
import {connect} from 'react-redux'
import './users.less'

import {addRippleEffect} from '../../utils'


class Users extends Component {


    render() {

        const {users} = this.props

        const testUsers = [
            {
                ContractId: 1,
                ContractNo: "a100000001",
                HospitalId: "1",
                HospitalName: "南山医院",
                ContractName: "B超采购合同1",
                ContractFile: "",
                DeviceCount: 20,
                AcceptDate: "2018/02/02"

            },
            {
                ContractId: 2,
                ContractNo: "a100000002",
                HospitalId: "1",
                HospitalName: "南山医院",
                ContractName: "B超采购合同2",
                ContractFile: "",
                DeviceCount: 30,
                AcceptDate: "2017/12/02"

            }
        ];

        const getItem = (info, index) => (
            <li key={index} className="user-item " onTouchStart={(e) => {
                // addRippleEffect(e.currentTarget, e.pageX, e.pageY)
                let touch = e.touches[0]
                addRippleEffect(e.currentTarget, touch.pageX, touch.pageY)

            }} onClick={() => {
                if (info.link != null) {
                    this.props.history.push(info.link)
                }
            }}>
                <h3 className="item-name">{info.ContractName}</h3>
                <div className="item-content">
                    <div className="content-line">
                        <span className="key">合同号</span>
                        <span className="value">{info.ContractNo}</span>
                    </div>
                    <div className="content-line">
                        <span className="key">到货数量</span>
                        <span className="value">{info.DeviceCount}</span>
                    </div>
                    <div className="content-line">
                        <span className="key">到货时间</span>
                        <span className="value">{info.AcceptDate}</span>
                    </div>
                    <div className="content-line">
                        <span className="key">所属医院</span>
                        <span className="value">{info.HospitalName}</span>
                    </div>

                </div>
            </li>)

        return (
            <div className="users">
                <div className="users-content">
                    {(testUsers).map((u, i) => getItem(u, i))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {users} = state.app
    return {
        users
    }
}

export default connect(mapStateToProps)(Users)