import React, {Component} from 'react'
import {connect} from 'react-redux'
import './users.less'

import {addRippleEffect} from '../../utils'


class Users extends Component {


    render() {

        const {users} = this.props

        const testUsers = [
            {
                PurchaseId: 1,
                Contract: {
                    ContractId: 1,
                    ContractNo: "a100000001",
                    HospitalId: "1",
                    HospitalName: "南山医院",
                    ContractName: "B超采购合同1",
                    ContractFile: "",
                    DeviceCount: 20,
                    AcceptDate: "2018/02/02"

                },
                PurchaseOwner: "李主任",
                HasBid: 1

            },{
                PurchaseId: 2,
                Contract: {
                    ContractId: 2,
                    ContractNo: "a100000002",
                    HospitalId: "1",
                    HospitalName: "东方医院",
                    ContractName: "B超采购合同2",
                    ContractFile: "",
                    DeviceCount: 30,
                    AcceptDate: "2017/12/02"

                },
                PurchaseOwner: "张主任",
                HasBid: 0

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
                <h3 className="item-name">{info.PurchaseId}</h3>
                <div className="item-content">
                    <div className="content-line">
                        <span className="key">合同</span>
                        <span className="value">{info.Contract.ContractName}</span>
                    </div>
                    <div className="content-line">
                        <span className="key">采购负责人</span>
                        <span className="value">{info.PurchaseOwner}</span>
                    </div>
                    <div className="content-line">
                        <span className="key">是否招标</span>
                        <span className="value">{info.HasBid?"是":"否"}</span>
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