/**
 * Created by Administrator on 2017/8/7.
 */
import axios from 'axios'
import cordovaHttp from './cordovaHttp'
import createHashHistory from 'history/createHashHistory'
import { Toast } from 'antd-mobile'
const history = createHashHistory()

axios.defaults.baseURL = 'http://47.100.198.255:8080/'

// http request 拦截器
axios.interceptors.request.use(config => {
	if (sessionStorage.token) {
		config.headers.token = `${sessionStorage.token}`
	}
	Toast.loading('加载中。。。', 0)
	return config
}, err => {
	return Promise.reject(err)
})

// http response 拦截器
axios.interceptors.response.use(response =>{
	Toast.hide()
	//token 过期
	if (response.data.flag === 100002) {
		if (sessionStorage.token) {
			sessionStorage.removeItem('token')
		}
		history.push('/login')
		return
	}
	return response
}, err => {
	if (err.response) {
		switch (err.response.status) {
			case 401: // 未登录认证
				console.log(401)
				if (sessionStorage.token) {
					sessionStorage.removeItem('token')
				}
				history.push('/login')
				break;
			default:
				break;
		}
	}
	return Promise.reject(err.response.data)
})

let http = {
	get http(){
        if (window.cordovaHTTP){
            return cordovaHttp
        }else{
        	return axios
		}
	}
}

// if (window.cordovaHTTP){
//     http = cordovaHttp
// }


export default http