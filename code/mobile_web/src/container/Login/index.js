/**
 * Created by Administrator on 2017/8/3.
 */
import React, {Component} from 'react'
import {Button, Toast, WingBlank, WhiteSpace} from 'antd-mobile'
import {connect} from 'react-redux'
import axios from '../../http'
import api from '../../api'
import './login.less'

import { login} from '../../redux/actions'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: 'tangwei',
            password: '111'
        }
    }

    componentDidMount() {

    }

    handleUser = (e) => {
        const username = e.target.value
        this.setState({
            username
        })
    }

    handlePassword = (e) => {
        const password = e.target.value
        this.setState({
            password
        })
    }

    handleClick = () => {
        const {history,dispatch} = this.props
        if (!this.state.username) {
            Toast.fail('请输入用户名！', 1)
            return
        }
        if (!this.state.password) {
            Toast.fail('请输入密码！', 1)
            return
        }
        const params = {
            loginName: this.state.username,
            password: this.state.password
        }

        Toast.success("登陆成功", 1);
        dispatch(login(params.loginName,params.loginName));
        history.push('/');

        // Toast.loading("登陆中");
        // let dtd = axios.http.post(api.loginUrl, params);
        //
        // dtd.then(res => {
        //         if (res.code == 0) {
        //             Toast.hide();
        //             Toast.success("登陆成功", 1);
        //             dispatch(login(params.loginName,params.loginName))
        //             history.push('/');
        //         } else {
        //             Toast.hide();
        //             Toast.fail("登陆失败，请稍后再试", 1);
        //         }
        //     })
        //     .catch(err => {
        //         Toast.hide();
        //         Toast.fail("登陆失败，请稍后再试:"+JSON.stringify(err), 1);
        //     })

    }

    render() {
        return (
            <div className="login">
                <h3 className="slogan">欢&nbsp;&nbsp;迎</h3>
                <div className="login-form">
                    <div className="form-line username">
                        <i className="username-icon"></i>
                        <input type="text" placeholder="请输入用户名" value={this.state.username}
                               onChange={this.handleUser}/>
                    </div>
                    <div className="form-line password">
                        <i className="password-icon"></i>
                        <input type="password" placeholder="请输入密码" value={this.state.password}
                               onChange={this.handlePassword}/>
                    </div>
                </div>
                <Button type="primary" className="login-btn" onClick={this.handleClick}>登录</Button>

            </div>
        )
    }
}

export default connect()(Login)