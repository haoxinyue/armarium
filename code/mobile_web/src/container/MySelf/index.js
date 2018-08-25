import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Modal, Toast, Button} from 'antd-mobile'

import './myself.less'

import {addRippleEffect} from '../../utils'

import {changeFooterSide, logout} from '../../redux/actions'

class MySelf extends Component {

    componentDidMount(){
        this.props.dispatch(changeFooterSide('right'))
    }

    doLogout(){
        const {dispatch, auth, history} = this.props;
        dispatch(logout(auth.userToken)).then(() => {
            Toast.info("已退出");
            history.replace('/login');
        })
    }


    render() {
        const {auth} = this.props;

        return (
            <div className="myself">
                <div className="myself-content" style={{paddingTop:'10vh',textAlign:'center'}}>
                    <h2 className={'user-name'}>{auth.userInfo.loginName||"无"}<br/>({auth.userInfo.roleName})</h2>
                    <Button type="primary" className="login-btn" onClick={this.doLogout.bind(this)} >退出登陆</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(MySelf)