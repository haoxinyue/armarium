/**
 * Created by Administrator on 2017/8/4.
 */

export const ACTION_TYPES ={
    LOG_IN:"AUTH/LOG_IN",
    LOG_OUT:"AUTH/LOG_OUT"
};

const auth = (state = {
    username: localStorage.getItem("auth.username"),
    token: localStorage.getItem("auth.token"),
    isAuthenticated: !!localStorage.getItem("auth.token"),
    userInfo:JSON.parse(localStorage.getItem("auth.userinfo")||"{}")
}, action) => {
    switch (action.type) {

        case ACTION_TYPES.LOG_IN:

            localStorage.setItem("auth.username",action.payload.username);
            localStorage.setItem("auth.token",action.payload.token);
            let uinfo = action.payload.userinfo||{};
            localStorage.setItem("auth.userinfo",JSON.stringify(uinfo));
            return {
                ...state,
                username: action.payload.username,
                token: action.payload.token,
                userInfo:uinfo,
                isAuthenticated: true
            };
        case ACTION_TYPES.LOG_OUT:
            localStorage.removeItem("auth.username");
            localStorage.removeItem("auth.token");

            return {
                ...state,
                username: '',
                token: '',
                isAuthenticated: false
            };

        default:
            return state
    }
}

export default auth