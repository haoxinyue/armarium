/**
 * Created by Administrator on 2017/8/3.
 */
import React, {Component} from 'react'
import {Button, Toast, WingBlank, WhiteSpace} from 'antd-mobile'
import {connect} from 'react-redux'
import axios from '../../http'
import {getQueryString} from '../../utils'
import api from '../../api'
import './login.less'
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    // http://localhost:3000/index.html?activity_id=59546453c5f45c0001dfde8c#/login
    // yyg
    // 12305
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
        const {history} = this.props
        if (!this.state.username) {
            Toast.fail('请输入用户名！', 1)
            return
        }
        if (!this.state.password) {
            Toast.fail('请输入密码！', 1)
            return
        }
        const params = {
            activity_id: getQueryString('activity_id'),
            password: this.state.password,
            username: this.state.username,
            times: 100
        }

        // history.push('/test')
        history.push('/devices')

        // history.push('/customer')

        // axios.post(api.loginUrl, params)
        // .then(res => {
        // 	if (res.data.flag === 60003) {
        // 		Toast.fail(res.data.desc, 1)
        // 		return
        // 	} else if (res.data.flag === 0) {
        // 		Toast.success(res.data.desc, 1)
        // 		sessionStorage.token = res.data.data
        // 		history.push('/customer')
        // 	}
        // })
        // .catch(err => {
        // 	console.log(err)
        // })
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