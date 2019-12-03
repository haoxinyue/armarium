/**
 * Created by Administrator on 2017/8/3.
 */
import React from 'react'
import Loadable from 'react-loadable'
import {authNeedInit} from '../components/AuthNeedComponent'
import {baseInit} from '../components/BaseComponent'

const loadComponent = (component) => {

    if (["Login", "Test"].includes(component)) {
        return baseInit(Loadable({
            loader: () => import(`../container/${component}/index.js`),
            loading: () => null
        }))
    } else {
        return authNeedInit(baseInit(Loadable({
            loader: () => import(`../container/${component}/index.js`),
            loading: () => null
        })))
    }


}

export const routes = [
    {
        path: '/login',
        component: loadComponent('Login'),
        exact: true,
        header: {
            title: '登录',
            visible: false
        }

    }, {
        path: '/dashboard',
        component: loadComponent('Dashboard'),
        exact: true,
        header: {
            title: '首页',
            visible: true
        },
        footer: {
            visible: true
        }

    },
    {
        path: '/users',
        component: loadComponent('Users'),
        exact: true,
        header: {
            title: '用户列表',
            left: "back"
        },

    }, {
        path: '/installCaseList',
        component: loadComponent('InstallCaseList'),
        exact: true,
        header: {
            title: '安装工单列表',
            visible: true,
            left: "back"
        }
    }, {
        path: '/installCaseDetail/:caseId',
        component: loadComponent('InstallCaseDetail'),
        exact: true,
        header: {
            title: '安装工单详情',
            visible: true,
            left: "back"
        }
    }, {
        path: '/installCaseEdit/:caseId',
        component: loadComponent('InstallCaseEdit'),
        exact: true,
        header: {
            title: '安装工单编辑',
            visible: true,
            left: "back"
        }
    }, {
        path: '/inspectionCaseList',
        component: loadComponent('InspectionCaseList'),
        exact: true,
        header: {
            title: '巡检历史',
            visible: true,
            left: "back"
        }
    }, {
        path: '/inspectionCaseEdit/:deviceId',
        component: loadComponent('InspectionCaseEdit'),
        exact: true,
        header: {
            title: '巡检',
            visible: true,
            left: "back"
        }
    },{
        path: '/pmCaseList',
        component: loadComponent('PmCaseList'),
        exact: true,
        header: {
            title: '保养工单',
            visible: true,
            left: "back"
        }
    }, {
        path: '/pmCaseEdit/:deviceId',
        component: loadComponent('PmCaseEdit'),
        exact: true,
        header: {
            title: '保养工单',
            visible: true,
            left: "back"
        }
    },{
        path: '/meterCaseList',
        component: loadComponent('MeterCaseList'),
        exact: true,
        header: {
            title: '计量工单列表',
            visible: true,
            left: "back"
        }
    }, {
        path: '/meterCaseEdit/:deviceId',
        component: loadComponent('MeterCaseEdit'),
        exact: true,
        header: {
            title: '计量工单',
            visible: true,
            left: "back"
        }
    },{
        path: '/stocktakingCase',
        component: loadComponent('StocktakingCaseList'),
        exact: true,
        header: {
            title: '盘点工单',
            visible: true,
            left: "back"
        }
    },{
        path: '/stocktakingCaseDevice/:caseId',
        component: loadComponent('StocktakingDeviceList'),
        exact: true,
        header: {
            title: '盘点设备列表',
            visible: true,
            left: "back"
        }
    }, {
        path: '/stocktakingCaseEdit/:deviceId',
        component: loadComponent('StocktakingCaseEdit'),
        exact: true,
        header: {
            title: '盘点设备',
            visible: true,
            left: "back"
        }
    }, {
        path: '/devices',
        component: loadComponent('Devices'),
        exact: true,
        header: {
            title: '设备列表',
            visible: true,
            left: "back"
        }
    },
    {
        path: '/deviceDetail/:deviceId',
        exact: true,
        component: loadComponent('DeviceDetail'),
        header: {
            title: '设备信息',
            left: "back"
        }
    }, {
        path: '/deviceEdit/:deviceId',
        exact: true,
        component: loadComponent('DeviceEdit'),
        header: {
            title: '设备编辑',
            left: "back"
        }
    }, {
        path: '/deviceAdd',
        exact: true,
        component: loadComponent('DeviceEdit'),
        header: {
            title: '新增设备',
            left: "back"
        }
    }, {
        path: '/repairs',
        exact: true,
        component: loadComponent('Repairs'),
        header: {
            title: '工单',
            left: "back"
        }
    }, {
        path: '/repairsMy',
        exact: true,
        component: loadComponent('Repairs'),
        header: {
            title: '我的维修单',
            left: "back"
        }
    }, {
        path: '/repairsMyReport',
        exact: true,
        component: loadComponent('Repairs'),
        header: {
            title: '我的报修单',
            left: "back"
        }
    }, {
        path: '/repairAdd',
        exact: true,
        component: loadComponent('RepairAdd'),
        header: {
            title: '新增报修',
            left: "back"
        }
    },{
        path: '/repairEdit/:caseId',
        exact: true,
        component: loadComponent('RepairEdit'),
        header: {
            title: '编辑报修',
            left: "back"
        }
    }, {
        path: '/repairDetail/:caseId',
        exact: true,
        component: loadComponent('RepairDetail'),
        header: {
            title: '工单详情',
            left: "back"
        }
    },
    {
        path: '/departments',
        exact: true,
        component: loadComponent('Departments'),
        header: {
            title: '部门列表',
            left: "back"
        }
    },
    {
        path: '/contracts',
        exact: true,
        component: loadComponent('Contracts'),
        header: {
            title: '合同管理',
            left: "back"
        }
    }, {
        path: '/purchases',
        exact: true,
        component: loadComponent('Purchases'),
        header: {
            title: '采购管理',
            left: "back"
        }
    },
    {
        path: '/myself',
        exact: true,
        component: loadComponent('MySelf'),
        header: {
            title: '个人中心',
            left: "back"
        },
        footer: {
            visible: true
        }
    },
    {
        path: '/noticeList',
        exact: true,
        component: loadComponent('NoticeList'),
        header: {
            title: '我的消息',
            left: "back"
        }
    },
    {
        path: '/test',
        exact: true,
        component: loadComponent('Test'),
        header: {
            title: '统计',
            left: "back"
        }
    }
]





