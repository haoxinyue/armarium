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
    get(url, data, config) {


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
    post(url, data, config) {
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
    },
    uploadFile(url, filePath, params = {}, name = "fileUpload") {
        let notify = (data) => {

        };
        let dtd = new Promise((resolve, reject) => {
            // window.FileTransfer.uploadFile(
            //     parseUrl(url),
            //     params,
            //     filePath,
            //     name,
            //     function (response) {
            //         return interceptorHttpResponse(response, resolve, reject)
            //     },
            //     function (response) {
            //         reject(response);
            //     })

            var fileUploadOptions = new window.FileUploadOptions();
            fileUploadOptions.fileKey = name;
            // fileUploadOptions.fileName = filePath.substr(filePath.lastIndexOf('/') + 1);
            fileUploadOptions.mimeType = "image/png";

            var fileTransfer = new window.FileTransfer();
            fileTransfer.onprogress = (res) => {
                notify({
                    percent: res.loaded / res.total
                })
            };
            fileTransfer.upload(
                filePath,
                url,
                (response) => {
                    console.log(JSON.stringify(response),null,4);
                    return interceptorHttpResponse({data:(response.response)}, resolve, reject)
                },
                (response) => {
                    reject(response);
                },
                fileUploadOptions);
        });

        dtd.onNotify=(cb)=>{
            notify = cb;
        };

        return dtd;
    }
}

export default http