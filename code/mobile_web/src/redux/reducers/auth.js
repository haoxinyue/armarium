/**
 * Created by Administrator on 2017/8/4.
 */

import * as types from '../actions/actionTypes'

const header = (state = {
    username: localStorage.getItem("auth.username"),
    token: localStorage.getItem("auth.token"),
    isAuthenticated: !!localStorage.getItem("auth.token"),
}, action) => {
    switch (action.type) {

        case types.LOG_IN:
            localStorage.setItem("auth.username",action.username)
            localStorage.setItem("auth.token",action.token)
            return {
                ...state,
                username: action.username,
                token: action.token,
                isAuthenticated: true
            };
        case types.LOG_OUT:
            localStorage.removeItem("auth.username");
            localStorage.removeItem("auth.token");

            return {
                ...state,
                username: '',
                token: '',
                isAuthenticated: true
            };

        default:
            return state
    }
}

export default header