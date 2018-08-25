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

function interceptorHttpRequest(request) {

}

function interceptorHttpResponse(response, resolve, reject) {
    try {
        response.data = JSON.parse(response.data);
        if (response.data.code === 0) {
            resolve(response);
        } else {
            reject(response)
        }
    } catch (e) {
        reject(response);
    }
}

const http = {
    get(url, data, config){


        return new Promise((resolve, reject) => {
            window.cordovaHTTP.get(
                parseUrl(url),
                data,
                config,
                Object.assign({}, config || {}),
                function (response) {

                    return interceptorHttpResponse(response, resolve, reject)

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
                Object.assign({}, config || {}),
                function (response) {
                    return interceptorHttpResponse(response, resolve, reject)
                }, function (response) {
                    reject(response);
                })
        })
    }
}

export default http