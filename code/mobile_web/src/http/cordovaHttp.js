/**
 * Created by zhouzechen on 2018/5/6.
 */



const cordovaHTTP = window.cordovaHTTP;

const baseUrl = "http://47.100.198.255:8080/"

function parseUrl(url) {
    if (url.startsWith("http")) {
        return url
    } else {
        return baseUrl + url
    }
}

function interceptorHttp(response) {

}

const http = {
    get(url, data, config){
        return new Promise((resolve, reject) => {
            window.cordovaHTTP.get(
                parseUrl(url),
                data,
                config,
                Object.assign({
                    // "Content-type": "application/x-www-form-urlencoded;charset:UTF-8"
                }, config || {}),
                function (response) {
                    try {
                        response.data = JSON.parse(response.data);
                        resolve(response.data);
                    } catch (e) {
                        reject(response);
                    }
                }, function (response) {
                    reject(response);
                })
        })
    },
    post(url, data, config){
        return new Promise((resolve, reject) => {
            window.cordovaHTTP.post(
                parseUrl(url),
                data,
                config || {},
                function (response) {
                    try {
                        response.data = JSON.parse(response.data);
                        resolve(response.data);
                    } catch (e) {
                        reject(response);
                    }
                }, function (response) {
                    reject(response);
                })
        })
    }
}

export default http