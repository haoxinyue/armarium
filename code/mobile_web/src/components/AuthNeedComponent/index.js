/**
 * Created by zhouzechen on 2018/5/5.
 */
import React from 'react';
import {connect} from 'react-redux';

export function authNeedInit(Component) {

    class BaseLayoutComponent extends React.Component {

        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth();
        }

        checkAuth() {
            const {history, isAuthenticated, location} = this.props
            if (!isAuthenticated) {
                let redirectAfterLogin = location.pathname;
                history.push(`/login?next=${redirectAfterLogin}`)
            }
        }


        render() {
            const {isAuthenticated} = this.props
            return isAuthenticated ? <Component {...this.props}/> : <div></div>

        }
    }

    const mapStateToProps = (state) => ({
        token: state.auth.token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated
    });

    return connect(mapStateToProps)(BaseLayoutComponent);

}