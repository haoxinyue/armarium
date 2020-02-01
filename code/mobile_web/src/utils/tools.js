import {runScanner} from "./index";
import {doPostQuery} from "../redux/actions";
import api from "../api";

export const scanDeviceQr = () => {
    return new Promise((resolve, reject) => {
        runScanner().then(async (result) => {
            // alert('result:'+JSON.stringify(result))
            let deviceId = /\[(\S+)\]/.exec(result.text);
            deviceId = deviceId && deviceId[1];
            if (!deviceId) {
                let deviceQr = /\?(\S+)/.exec(result.text);
                if (deviceQr && deviceQr[1]) {
                    try {
                        let info = await doPostQuery(api.deviceGetByQr, {
                            qrCode: deviceQr[1]
                        });
                        // alert(JSON.stringify(info))
                        // console.log('qrInfo', info)
                        deviceId = info.data.deviceId;
                    } catch (e) {
                        // console.log(e)
                        // alert('e:'+JSON.stringify(e))
                        reject(window.cordovaHTTP?e.data.data.message:e.message)
                    }

                }
            }
            if (deviceId) {
                resolve(deviceId)
            } else {
                reject()
            }
        }, () => {
            reject()
        })

    })
}