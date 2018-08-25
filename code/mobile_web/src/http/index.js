/**
 * Created by Administrator on 2017/8/7.
 */
import axios from './http-js'
import cordovaHttp from './http-cordova'

const AXIOS = {
	get http(){
        if (window.cordovaHTTP){
            return cordovaHttp
        }else{
        	return axios
		}
	}
};


export default AXIOS