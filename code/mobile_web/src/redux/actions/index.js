/**
 * Created by Administrator on 2017/8/4.
 */


import {createAction} from 'redux-actions'

import axios from '../../http'
import api from '../../api'


import {ACTION_TYPES as DEVICE} from "../reducers/device";
import {ACTION_TYPES as INSTALL_CASE} from "../reducers/installCase";
import {ACTION_TYPES as AUTH} from "../reducers/auth";
import {ACTION_TYPES as FOOTER } from "../reducers/footer";
import {ACTION_TYPES as HEADER } from "../reducers/header";
import {ACTION_TYPES as REPAIR } from "../reducers/repair";
import {getFormData} from "../../utils";

/**
 * action creator
 */


/**********************************************************/

export const changeHeaderTitle = (title) => ({
    type: HEADER.CHANGE_HEADER_TITLE,
    title
})
export const changeHeaderVisible = (visible) => ({
    type: HEADER.CHANGE_HEADER_VISIBLE,
    visible
})
export const changeHeaderLeft = (leftContent) => ({
    type: HEADER.CHANGE_HEADER_LEFT_CONTENT,
    leftContent
})
export const changeHeaderRight = (rightContent) => ({
    type: HEADER.CHANGE_HEADER_RIGHT_CONTENT,
    rightContent
})

/**********************************************************/


export const changeFooterVisible = (visible) => ({
    type: FOOTER.CHANGE_FOOTER_VISIBLE,
    visible
})

export const changeFooterSide = (side) => ({
    type: FOOTER.CHANGE_FOOTER_SIDE,
    side
})

/**********************************************************/


/**********************************************************/

export const login = createAction(AUTH.LOG_IN,
    (username, password) =>
        new Promise((resolve,reject)=>{
            axios.http.post(api.loginUrl, getFormData({
                loginName: username,
                loginPassword: password
            })).then((res) => {
                let success = res.data && res.data.code ===0;
                if(success){
                    resolve({
                        username: username,
                        token: username,
                        userinfo:res.data.data
                    })
                }else{
                    reject(res.data)
                }
            },(err)=>{
                reject(err)
            })
        })

)


export const logout = createAction(AUTH.LOG_OUT,
    (token) => axios.http.post(api.logoutUrl, {}).then(() => ({token}))
)



/* ******************************************************** */
export const fetchInspectionCaseList = createAction(INSTALL_CASE.UPDATE_LIST,
    (params) =>
        axios.http.post(api.inspectionCaseListGet, getFormData({
            ...params
        })).then((res) => (res.data))
)
export const fetchToInspectionDeviceList = createAction(INSTALL_CASE.UPDATE_LIST,
    (params) =>
        axios.http.post(api.inspectionCaseDeviceListGet, getFormData({
            ...params
        })).then((res) => (res.data))
)

export const getInspectionCaseDetail = createAction(INSTALL_CASE.SAVE,
    (params) =>
        axios.http.post(api.inspectionCaseGet, getFormData({
            ...params
        })).then((res) => (res.data))
)

export const completeInspectionCaseDetail = createAction(INSTALL_CASE.SAVE,
    (params) =>
        axios.http.post(api.inspectionCaseComplete, getFormData({
            ...params
        })).then((res) => (res.data))
)
/* ******************************************************** */
export const fetchInstallCaseList = createAction(INSTALL_CASE.UPDATE_LIST,
    (params) =>
        axios.http.post(api.installCaseListGet, getFormData({
            ...params
        })).then((res) => (res.data))
)

export const getInstallCaseDetail = createAction(INSTALL_CASE.SAVE,
    (params) =>
        axios.http.post(api.installCaseGet, getFormData({
            ...params
        })).then((res) => (res.data))
)

export const compeleteInstallCaseDetail = createAction(INSTALL_CASE.SAVE,
    (params) =>
        new Promise((resolve,reject)=> {
            axios.http.post(api.installCaseComplete, getFormData({
                ...params
            })).then((res) => {
                let success = res.data && res.data.code ===0;
                if(success){
                    resolve(res.data)
                }else{
                    reject(res)
                }
            },(err)=>{
                reject(err)
            })
        })
)

/* ******************************************************** */



export const fetchDeviceList = createAction(DEVICE.UPDATE_LIST,
    (params) =>
        axios.http.post(api.deviceListGet, getFormData({
            ...params
        })).then((res) => (res.data))
)


export const getDeviceDetail = createAction(DEVICE.SAVE,
    (params) =>
        axios.http.post(api.deviceGet, getFormData({
            ...params
        })).then((res) => (res.data))
)
export const addDevice = createAction(DEVICE.SAVE,
    (params) =>
        axios.http.post(api.deviceAdd, getFormData({
            ...params
        })).then((res) => (res.data))
)

export const updateDevice = createAction(DEVICE.SAVE,
    (params) =>
        axios.http.post(api.deviceUpdate, getFormData({
            ...params
        })).then((res) => (res.data))
)

export const delDevice = createAction(DEVICE.DELETE,
    (params) =>
        axios.http.post(api.deviceDel, getFormData({
            ...params
        })).then((res) => params)
)


/* ******************************************************** */
export const addRepair = createAction(REPAIR.SAVE,
    (params) =>
        axios.http.post(api.repairAdd, ({
            ...params
        })).then((res) => (res.data))
);
export const updateRepair = createAction(REPAIR.SAVE,
    (params) =>
        axios.http.post(api.repairUpdate, getFormData({
            ...params
        })).then((res) => (res.data))
);
export const getRepairList = createAction(REPAIR.UPDATE_LIST,
    (params) =>
        axios.http.post(api.repairListGet, getFormData({
            ...params
        })).then((res) => (res.data))
);

export const getRepairDetail = createAction(REPAIR.SAVE,
    (params) =>
        new Promise((resolve,reject)=>{
            Promise.all([axios.http.post(api.repairGet, ({
                ...params
            })),axios.http.post(api.repairTimeShaftGet, ({
                ...params
            }))]).then((reslist) =>{

                let info = {
                    ...reslist[0].data.data,
                    timeShaft:reslist[1].data.data
                };
                resolve({
                    data:info
                });

            },(err)=>{
                reject(err)
            })
        })

);

/* ******************************************************** */


export const uploadFile = (fileDatas) => {
    if (!fileDatas || fileDatas.length === 0) {
        return Promise.reject([])
    }
    let list = [];
    fileDatas.forEach((d) => {
        list.push(axios.http.post(api.fileUpload, {
            fileUpload: d.file
        },{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }))
    });
    return Promise.all(list);
}


/* ******************************************************** */
