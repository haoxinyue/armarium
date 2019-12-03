/**
 * Created by Administrator on 2017/8/4.
 */


import {createAction} from 'redux-actions'

import axios from '../../http'
import api from '../../api'


import {ACTION_TYPES as DEVICE} from "../reducers/device";
import {ACTION_TYPES as INSTALL_CASE} from "../reducers/installCase";
import {ACTION_TYPES as NOTICE} from "../reducers/notice";
import {ACTION_TYPES as INSPECTION_CASE} from "../reducers/inspectionCase";
import {ACTION_TYPES as STOCKTAKING_CASE} from "../reducers/stocktakingCase";
import {ACTION_TYPES as PM_CASE} from "../reducers/pmCase";
import {ACTION_TYPES as AUTH} from "../reducers/auth";
import {ACTION_TYPES as FOOTER} from "../reducers/footer";
import {ACTION_TYPES as HEADER} from "../reducers/header";
import {ACTION_TYPES as REPAIR} from "../reducers/repair";
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

function doPostQuery(url, data, resolveMapFunc) {
    return new Promise((resolve, reject) => {
        axios.http.post(url, getFormData(data)).then((res) => {
            let success = res.data && res.data.code === 0;
            if (success) {
                if (resolveMapFunc) {
                    resolve(resolveMapFunc(res.data))
                } else {
                    resolve(res.data)
                }

            } else {
                reject({
                    error: 'server error',
                    ...res.data || {}
                })
            }
        }, (err) => {
            reject({
                error: 'exception',
                data: err
            })
        })
    })

}


/**********************************************************/

export const login = createAction(AUTH.LOG_IN,
    (username, password) => doPostQuery(
        api.loginUrl,
        {
            loginName: username,
            loginPassword: password
        },
        (res) => {
            return {
                username: username,
                token: username,
                userinfo: res.data
            }
        }
    )
// new Promise((resolve, reject) => {
//     axios.http.post(api.loginUrl, getFormData({
//         loginName: username,
//         loginPassword: password
//     })).then((res) => {
//         let success = res.data && res.data.code === 0;
//         if (success) {
//             resolve({
//                 username: username,
//                 token: username,
//                 userinfo: res.data.data
//             })
//         } else {
//             reject(res.data)
//         }
//     }, (err) => {
//         reject(err)
//     })
// })
)


export const logout = createAction(AUTH.LOG_OUT,
    (token) => doPostQuery(api.logoutUrl, {}, () => ({token}))
    // axios.http.post(api.logoutUrl, {}).then(() => ({token}))
)


/* ******************************************************** */
export const fetchInspectionCaseList = createAction(INSPECTION_CASE.UPDATE_LIST,
    (params) =>
        doPostQuery(api.inspectionCaseListGet, {...params})
    // axios.http.post(api.inspectionCaseListGet, getFormData({
    //     ...params
    // })).then((res) => (res.data))
)
export const fetchToInspectionDeviceList = createAction(INSPECTION_CASE.UPDATE_LIST,
    (params) =>
        doPostQuery(api.inspectionCaseDeviceListGet, {...params})
    // axios.http.post(api.inspectionCaseDeviceListGet, getFormData({
    //     ...params
    // })).then((res) => (res.data))
)

export const getInspectionCaseDetail = createAction(INSPECTION_CASE.SAVE,
    (params) =>
        doPostQuery(api.inspectionCaseGet, {...params})
    // axios.http.post(api.inspectionCaseGet, getFormData({
    //     ...params
    // })).then((res) => (res.data))
)

export const completeInspectionCaseDetail = createAction(INSPECTION_CASE.SAVE,
    (params) =>
        doPostQuery(api.inspectionCaseComplete, {...params})
    // axios.http.post(api.inspectionCaseComplete, getFormData({
    //     ...params
    // })).then((res) => (res.data))
)
/* ******************************************************** */

export const fetchMeterCaseList = createAction(STOCKTAKING_CASE.UPDATE_LIST,
    (params) =>
        doPostQuery(api.meterCaseListGet, {...params})
)

export const getMeterCaseDetail = createAction(STOCKTAKING_CASE.SAVE,
    (params) =>
        doPostQuery(api.meterCaseGet, {...params})
)

export const completeMeterCase = createAction(STOCKTAKING_CASE.SAVE,
    (params) =>
        doPostQuery(api.meterCaseComplete, {...params})
)


/* ******************************************************** */
export const fetchStocktakingCaseList = createAction(STOCKTAKING_CASE.UPDATE_LIST,
    (params) =>
        doPostQuery(api.stocktakingCaseListGet, {...params})
    // axios.http.post(api.inspectionCaseListGet, getFormData({
    //     ...params
    // })).then((res) => (res.data))
)

export const fetchStocktakingCaseDEviceList = createAction(STOCKTAKING_CASE.UPDATE_DEVICE_LIST,
    (params) =>
        doPostQuery(api.stocktakingCaseDeviceListGet, {...params})
    // axios.http.post(api.inspectionCaseListGet, getFormData({
    //     ...params
    // })).then((res) => (res.data))
)

export const getStocktakingCaseDetail = createAction(STOCKTAKING_CASE.SAVE,
    (params) =>
        doPostQuery(api.stocktakingCaseGet, {...params})
)

export const completeStocktakingCase = createAction(STOCKTAKING_CASE.SAVE,
    (params) =>
        doPostQuery(api.stocktakingCaseComplete, {...params})
)


/* ******************************************************** */
export const fetchPmCaseList = createAction(PM_CASE.UPDATE_LIST,
    (params) =>
        doPostQuery(api.pmCaseListGet, {...params})
    // axios.http.post(api.pmCaseListGet, getFormData({
    //     ...params
    // })).then((res) => (res.data))
)


export const getPmCaseDetail = createAction(PM_CASE.SAVE,
    (params) =>
        doPostQuery(api.pmCaseGet, {...params})
    // axios.http.post(api.pmCaseGet, getFormData({
    //     ...params
    // })).then((res) => (res.data))
)

export const getPmCaseIdByDeviceId = createAction(PM_CASE.SAVE,
    (params) =>
        doPostQuery(api.pmCaseIdListByDeviceIdGet, {...params})
    // axios.http.post(api.pmCaseGet, getFormData({
    //     ...params
    // })).then((res) => (res.data))
)

export const getPmCaseDetailByDevice = createAction(PM_CASE.SAVE,
    (params) =>
        doPostQuery(api.pmCaseGetDevice, {...params})
    // axios.http.post(api.pmCaseGet, getFormData({
    //     ...params
    // })).then((res) => (res.data))
)

export const completePmCaseDetail = createAction(PM_CASE.SAVE,
    (params) =>
        doPostQuery(api.pmCaseComplete, {...params})
    // axios.http.post(api.pmCaseComplete, getFormData({
    //     ...params
    // })).then((res) => (res.data))
)

/* ******************************************************** */

function getUserNoticeFetch(userId) {

    return new Promise((resolve, reject) => {
        if (userId == null) {
            reject({
                code: -1,
                message: "userId can not be null"
            })
            return
        }
        userId = Number(userId)
        Promise.all([
            doPostQuery(api.noticeInstallCaseGet, {assigneeUserId: userId}),
            // axios.http.post(api.noticeInstallCaseGet, getFormData({
            //     assigneeUserId: userId
            // })),
            doPostQuery(api.noticeInspectionCaseGet, {assigneeUserId: userId}),
            // axios.http.post(api.noticeInspectionCaseGet, getFormData({
            //     assigneeUserId: userId
            // })),

            doPostQuery(api.noticePmCaseGet, {assigneeUserId: userId}),
            // axios.http.post(api.noticePmCaseGet, getFormData({
            //     assigneeUserId: userId
            // })),

            doPostQuery(api.noticeRepairCaseGet, {assigneeUserId: userId}),

            doPostQuery(api.noticeStocktakingCaseGet, {assigneeUserId: userId}),
            // axios.http.post(api.noticeRepairCaseGet, getFormData({
            //     assigneeUserId: userId
            // })),
        ]).then((resList) => {
            // "code": 0,
            //     "message": "",
            //     "recordCount":0,
            let res = {
                code: 0,
                data: []
            };
            const typeList = ["install", "inspection", "pm", "repair", "stocktaking"];
            const typeNameList = ["安装工单", "巡检工单", "保养工单", "保修工单", "盘点工单"];
            resList.forEach((r, i) => {
                let rData = r.data;
                if (rData) {

                    // if (rData.code === 0 && rData.recordCount) {
                    res.data.push({
                        noticeId: i,
                        type: typeList[i],
                        message: `您有${rData.recordCount || 0}条${typeNameList[i]}需要处理`
                    })
                    // }

                }

            });

            resolve(res);


        }, (err) => {
            reject(err)
        })


    })

}


export const fetchNoticeList = createAction(NOTICE.UPDATE_LIST,
    (params) =>
        getUserNoticeFetch(params.userId)
)


export const delNoticeList = createAction(NOTICE.UPDATE_LIST, (params) => Promise.resolve({
    code: 0,
    noticeId: params.noticeId
}))

/* ******************************************************** */
export const fetchInstallCaseList = createAction(INSTALL_CASE.UPDATE_LIST,
    (params) =>
        doPostQuery(api.installCaseListGet, {...params})
    // axios.http.post(api.installCaseListGet, getFormData({
    //     ...params
    // })).then((res) => (res.data))
)

export const getInstallCaseDetail = createAction(INSTALL_CASE.SAVE,
    (params) =>
        doPostQuery(api.installCaseGet, {...params})
    // axios.http.post(api.installCaseGet, getFormData({
    //     ...params
    // })).then((res) => (res.data))
)

export const compeleteInstallCaseDetail = createAction(INSTALL_CASE.SAVE,
    (params) =>
        doPostQuery(api.installCaseComplete, {...params})
)

export const updateInstallCase = createAction(INSTALL_CASE.SAVE,
    (params) =>
        doPostQuery(api.installCaseUpdate, {...params})
)

/* ******************************************************** */


export const fetchDeviceList = createAction(DEVICE.UPDATE_LIST,
    (params) =>
        doPostQuery(api.deviceListGet, {...params})
    // axios.http.post(api.deviceListGet, getFormData({
    //     ...params
    // })).then((res) => (res.data))
)


export const getDeviceDetail = createAction(DEVICE.SAVE,
    (params) =>
        doPostQuery(api.deviceGet, {...params})
    // axios.http.post(api.deviceGet, getFormData({
    //     ...params
    // })).then((res) => (res.data))
)


export const addDevice = createAction(DEVICE.SAVE,
    (params) =>
        doPostQuery(api.deviceAdd, {...params})
    // axios.http.post(api.deviceAdd, getFormData({
    //     ...params
    // })).then((res) => (res.data))
)

export const updateDevice = createAction(DEVICE.SAVE,
    (params) =>
        doPostQuery(api.deviceUpdate, {...params})
    // axios.http.post(api.deviceUpdate, getFormData({
    //     ...params
    // })).then((res) => (res.data))
)

export const delDevice = createAction(DEVICE.DELETE,
    (params) =>
        doPostQuery(api.deviceDel, {...params})
    // axios.http.post(api.deviceDel, getFormData({
    //     ...params
    // })).then((res) => params)
)


/* ******************************************************** */
export const addRepair = createAction(REPAIR.SAVE,
    (params) =>
        doPostQuery(api.repairAdd, {...params})
    // axios.http.post(api.repairAdd, getFormData({
    //     ...params
    // })).then((res) => (res.data))
);
export const updateRepair = createAction(REPAIR.SAVE,
    (params) =>
        doPostQuery(api.repairUpdate, {...params})
    // axios.http.post(api.repairUpdate, getFormData({
    //     ...params
    // })).then((res) => (res.data))
);
export const closeRepair = createAction(REPAIR.CLOSE,
    (params) =>
        doPostQuery(api.repairClose, {...params})
    // axios.http.post(api.repairUpdate, getFormData({
    //     ...params
    // })).then((res) => (res.data))
);
export const getRepairList = createAction(REPAIR.UPDATE_LIST,
    (params) =>
        doPostQuery(api.repairListGet, {...params})
    // axios.http.post(api.repairListGet, getFormData({
    //     ...params
    // })).then((res) => (res.data))
);

export const getRepairDetail = createAction(REPAIR.SAVE,
    (params) =>

        new Promise((resolve, reject) => {
            Promise.all([
                doPostQuery(api.repairGet, {...params}),
                doPostQuery(api.repairTimeShaftGet, {...params}),
            ]).then((reslist) => {
                console.log(reslist)
                if (reslist[0].data) {
                    let info = {
                        ...reslist[0].data,
                        timeShaft: reslist[1].data
                    };
                    resolve({
                        data: info
                    });
                } else {
                    reject({
                        error: 'code error',
                        data: reslist[0].data
                    })
                }
            }, (err) => {
                reject({
                    error: 'exception',
                    data: err
                })
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
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }))
    });
    return Promise.all(list);
}


/* ******************************************************** */
