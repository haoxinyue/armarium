/**
 * Created by Administrator on 2017/8/7.
 */
export default {

    baseUrl:()=>window.cordovaHTTP?"http://47.100.198.255:8080/":"/api/",


    loginUrl: 'auth/login',
    logoutUrl: 'auth/logout',

    deviceAdd: 'equip/addDevice',
    deviceDel: 'equip/delDevice',
    deviceUpdate: 'equip/updDevice',
    deviceGet: 'equip/getDevice',
    deviceListGet: 'equip/getDeviceList',

    installCaseComplete: 'install_case/completeInsCase',
    installCaseGet: 'install_case/getInsCaseInfo',
    installCaseListGet: 'install_case/getInsCaseList',

    pmCaseComplete: 'pm_case/completePmCase',
    pmCaseGet: 'pm_case/getPmCaseInfo',
    pmCaseListGet: 'pm_case/getPmCaseList',

    inspectionCaseComplete: 'insp_case/completeInspCase',
    inspectionCaseGet: 'insp_case/getInspCaseInfo',
    inspectionCaseListGet: 'insp_case/getInspCaseList',
    inspectionCaseDeviceListGet: 'insp_case/getInspDevices',

    stocktakingCaseComplete: 'stock_tk_case/updStockTKCase',
    stocktakingCaseGet: 'stock_tk_case/getStockTKInfo',
    stocktakingCaseListGet: 'stock_tk_case/getStockTKCaseList',
    stocktakingCaseDeviceListGet: 'stock_tk_case/getStockTKDeviceList',



    meterCaseComplete: 'meter_case/completeMeterCase',
    meterCaseGet: 'meter_case/getStockTKInfo',
    meterCaseListGet: 'meter_case/getMeterCaseInfos',

    depTreeGet: 'dept/getDeptTree',
    depGet: 'dept/getDept',
    depAdd: 'dept/addDept',
    depDel: 'dept/delDept',
    depUpdate: 'dept/updDept',

    areaGet: 'area/getAreaInfo',

    fileUpload: 'accessory/fileUpload',

    repairAdd: 'case/addMtCase',
    repairListGet: 'case/getMtCaseList',
    repairGet: 'case/getMtCaseInfo',
    repairUpdate: 'case/updMtCase',
    repairTimeShaftGet: 'case/getCaseTimeShaft',

    noticeRepairCaseGet: 'case/rotateMtCase',
    noticeInstallCaseGet: 'install_case/rotateInsCaseState',
    noticeInspectionCaseGet: 'insp_case/rotateInspCaseState',
    noticePmCaseGet: 'pm_case/rotatePmCaseState',
    noticeStocktakingCaseGet: 'stock_tk_case/rotateTKCaseState',


}
