import React, {Component} from 'react'
import {connect} from 'react-redux'
import './users.less'

import {addRippleEffect} from '../../utils'


class Users extends Component {


    render() {

        const {users} = this.props

        const testUsers = [
            {
            UserId:"1",
            LoginName:"LoginName1",
            Mobile:"13911112222",
            Email:"Email@163.com",
            DisplayName:"DisplayName1"
        },{
            UserId:"2",
            LoginName:"LoginName2",
            Mobile:"13911112222",
            Email:"Email@163.com",
            DisplayName:"DisplayName2"
        },{
            UserId:"3",
            LoginName:"LoginName3",
            Mobile:"13911112222",
            Email:"Email@163.com",
            DisplayName:"DisplayName3"
        },{
            UserId:"4",
            LoginName:"LoginName4",
            Mobile:"13911112222",
            Email:"Email@163.com",
            DisplayName:"DisplayName4"
        },{
            UserId:"5",
            LoginName:"LoginName5",
            Mobile:"13911112222",
            Email:"Email@163.com",
            DisplayName:"DisplayName5"
        },
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
                <h3 className="item-name">{info.DisplayName}</h3>
                <div className="item-content">
                    <div className="content-line">
                        <span className="key">手机号码</span>
                        <span className="value">{info.Mobile}</span>
                    </div>
                    <div className="content-line">
                        <span className="key">邮箱</span>
                        <span className="value">{info.Email}</span>
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