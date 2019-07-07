import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach(model => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }

      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () =>
      models.filter(model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = app => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login', 'hospital', 'department', 'engineer'], () =>
        import(/* webpackChunkName: "BasicLayout" */ '../layouts/BasicLayout')
      ),
    },
    '/dashboard/analysis': {
      component: dynamicWrapper(app, ['chart'], () =>
        import(/* webpackChunkName: "Analysis" */ '../routes/Dashboard/DemoAnalysis')
      ),
    },

    '/device/device-list': {
      component: dynamicWrapper(app, ['device'], () =>
        import(/* webpackChunkName: "DeviceList" */ '../routes/Device/DeviceList')
      ),
    },
    '/device/device-detail/:deviceId': {
      component: dynamicWrapper(app, ['device', 'hospital'], () =>
        import(/* webpackChunkName: "DeviceDetail" */ '../routes/Device/DeviceDetail')
      ),
    },
    '/device/device-edit/:deviceId': {
      component: dynamicWrapper(app, ['device', 'hospital', 'department'], () =>
        import(/* webpackChunkName: "DeviceEdit" */ '../routes/Device/DeviceEdit')
      ),
    },
    '/device/device-add/': {
      component: dynamicWrapper(app, ['device', 'hospital', 'department'], () =>
        import(/* webpackChunkName: "DeviceEdit" */ '../routes/Device/DeviceEdit')
      ),
    },

    '/users/user-list': {
      component: dynamicWrapper(app, ['userlist', 'role', 'department'], () =>
        import(/* webpackChunkName: "UserList" */ '../routes/User/UserList')
      ),
    },

    '/users/user-detail/:userId': {
      component: dynamicWrapper(app, ['userlist', 'role', 'department'], () =>
        import(/* webpackChunkName: "UserDetail" */ '../routes/User/UserDetail')
      ),
    },

    //  '/users/user-edit/:userId':{
    //   component: dynamicWrapper(app, ['userlist'], () => import(/* webpackChunkName: "UserList" */'../routes/User/UserList')),
    // },

    '/department/department-tree': {
      component: dynamicWrapper(app, ['department', 'hospital'], () =>
        import(/* webpackChunkName: "DepartmentTree" */ '../routes/Department/DepartmentTree')
      ),
    },

    '/repair/repair-detail/:caseId': {
      component: dynamicWrapper(app, ['repair', 'engineer'], () =>
        import(/* webpackChunkName: "RepairDetail" */ '../routes/Repair/RepairDetail')
      ),
    },
    '/repair/repair-list': {
      component: dynamicWrapper(app, ['repair', 'engineer', 'device'], () =>
        import(/* webpackChunkName: "RepairList" */ '../routes/Repair/RepairList')
      ),
    },

    /* ============================================================================================ */

    '/asset/asset-add': {
      component: dynamicWrapper(app, ['device', 'hospital', 'department'], () =>
        import(/* webpackChunkName: "DeviceEdit" */ '../routes/Device/DeviceList')
      ),
    },
    '/asset/asset-list': {
      component: dynamicWrapper(app, ['department', 'stocktakingCase', 'engineer'], () =>
        import(/* webpackChunkName: "StocktakingCaseList" */ '../routes/StocktakingCase/StocktakingCaseList')
      ),
    },
    '/asset/asset-case/:caseId': {
      component: dynamicWrapper(app, ['department', 'stocktakingCase', 'engineer'], () =>
        import(/* webpackChunkName: "StocktakingCaseList" */ '../routes/StocktakingCase/StocktakingCaseDetail')
      ),
    },
    '/asset/asset-doc': {
      component: dynamicWrapper(app, ['device'], () =>
        import(/* webpackChunkName: "DeviceList" */ '../routes/Device/DeviceList')
      ),
    },
    '/asset/asset-chart': {
      component: dynamicWrapper(app, ['chart'], () =>
        import(/* webpackChunkName: "DemoAnalysis" */ '../routes/Dashboard/DemoAnalysis')
      ),
    },
    '/asset/asset-event': {
      component: dynamicWrapper(app, ['repair', 'badEvent', 'device'], () =>
        import(/* webpackChunkName: "RepairList" */ '../routes/BadEvent/BadEventList')
      ),
    },
    '/asset/asset-role': {
      component: dynamicWrapper(app, ['role'], () =>
        import(/* webpackChunkName: "RepairList" */ '../routes/User/RoleList')
      ),
    },

    /* ============================================================================================ */
    '/work-order/device-repair': {
      component: dynamicWrapper(app, ['repair', 'engineer', 'device'], () =>
        import(/* webpackChunkName: "RepairList" */ '../routes/Repair/RepairList')
      ),
    },
    '/work-order/device-care': {
      component: dynamicWrapper(app, ['repair', 'engineer', 'device', 'pmCase'], () =>
        import(/* webpackChunkName: "PmCaseList" */ '../routes/PmCase/PmCaseList')
      ),
    },
    '/work-order/device-check': {
      component: dynamicWrapper(app, ['repair', 'engineer', 'inspectionCase'], () =>
        import(/* webpackChunkName: "InspectionCaseList" */ '../routes/InspectionCase/InspectionCaseList')
      ),
    },
    '/work-order/device-add': {
      component: dynamicWrapper(app, ['device', 'hospital', 'department', 'installCase'], () =>
        import(/* webpackChunkName: "InstallCaseList" */ '../routes/InstallCase/InstallCaseList')
      ),
    },
    '/work-order/device-calc': {
      component: dynamicWrapper(app, ['meterCase', 'engineer', 'device'], () =>
        import(/* webpackChunkName: "MeterCaseList" */ '../routes/MeterCase/MeterCaseList')
      ),
    },
    '/work-order/order-dispatch': {
      component: dynamicWrapper(app, ['repair', 'engineer', 'device'], () =>
        import(/* webpackChunkName: "RepairList" */ '../routes/Repair/RepairList')
      ),
    },
    /* ============================================================================================ */
    '/install-case/case-edit/:caseId': {
      component: dynamicWrapper(app, ['installCase', 'hospital', 'device'], () =>
        import(/* webpackChunkName: "InstallCaseEdit" */ '../routes/InstallCase/InstallCaseEdit')
      ),
    },
    /* ============================================================================================ */
    '/bad-event/event-edit/:eventId': {
      component: dynamicWrapper(app, ['badEvent', 'hospital', 'device'], () =>
        import(/* webpackChunkName: "InstallCaseEdit" */ '../routes/BadEvent/BadEventEdit')
      ),
    },
    /* ============================================================================================ */

    // '/dashboard/monitor': {
    //   component: dynamicWrapper(app, ['monitor'], () => import(/* webpackChunkName: "Monitor" */'../routes/Dashboard/Monitor')),
    // },
    // '/dashboard/workplace': {
    //   component: dynamicWrapper(app, ['project', 'activities', 'chart'], () =>
    //     /* webpackChunkName: "Workplace" */
    //     import('../routes/Dashboard/Workplace')
    //   ),
    //   // hideInBreadcrumb: true,
    //   // name: '工作台',
    //   // authority: 'admin',
    // },
    // '/form/basic-form': {
    //   component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/BasicForm')),
    // },
    // '/form/step-form': {
    //   component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm')),
    // },
    // '/form/step-form/info': {
    //   name: '分步表单（填写转账信息）',
    //   component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step1')),
    // },
    // '/form/step-form/confirm': {
    //   name: '分步表单（确认转账信息）',
    //   component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step2')),
    // },
    // '/form/step-form/result': {
    //   name: '分步表单（完成）',
    //   component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step3')),
    // },
    // '/form/advanced-form': {
    //   component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/AdvancedForm')),
    // },

    // '/list/table-list': {
    //   component: dynamicWrapper(app, ['rule'], () => import('../routes/List/TableList')),
    // },
    // '/list/basic-list': {
    //   component: dynamicWrapper(app, ['list'], () => import('../routes/List/BasicList')),
    // },
    // '/list/card-list': {
    //   component: dynamicWrapper(app, ['list'], () => import('../routes/List/CardList')),
    // },
    // '/list/search': {
    //   component: dynamicWrapper(app, ['list'], () => import('../routes/List/List')),
    // },
    // '/list/search/projects': {
    //   component: dynamicWrapper(app, ['list'], () => import('../routes/List/Projects')),
    // },
    // '/list/search/applications': {
    //   component: dynamicWrapper(app, ['list'], () => import('../routes/List/Applications')),
    // },
    // '/list/search/articles': {
    //   component: dynamicWrapper(app, ['list'], () => import('../routes/List/Articles')),
    // },
    // '/profile/basic': {
    //   component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/BasicProfile')),
    // },
    // '/profile/advanced': {
    //   component: dynamicWrapper(app, ['profile'], () =>
    //     import('../routes/Profile/AdvancedProfile')
    //   ),
    // },
    '/result/success': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
    },
    '/result/fail': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () =>
        import('../routes/Exception/triggerException')
      ),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },
    '/user/register': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
    },
    '/user/register-result': {
      component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
    },
    // '/user/:id': {
    //   component: dynamicWrapper(app, [], () => import('../routes/User/SomeComponent')),
    // },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach(path => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
    };
    routerData[path] = router;
  });
  return routerData;
};
