import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '工作台',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '综合分析',
        path: 'analysis',
      },
    ],
  },
  {
    name: '资产管理',
    icon: 'api',
    path: 'asset',
    children: [
      {
        name: '设备管理',
        path: 'device-list',
      },
      {
        name: '资产盘点',
        path: 'asset-list',
      },
      {
        name: '文档管理',
        path: 'asset-doc',
      },
      {
        name: '不良事件',
        path: 'asset-event',
      },
      {
        name: '统计报表',
        path: 'asset-chart',
      },
      {
        name: '角色设置',
        path: 'asset-role',
      },
      /*{
        name: '设备详情',
        path: 'device-detail',
        authority:"invisible"
      },*/
      /*{
        name: '设备编辑',
        path: 'device-edit',
        authority:"invisible"
      },*/
    ],
  },
  {
    name: '工单管理',
    icon: 'tool',
    path: 'work-order',
    children: [
      {
        name: '设备维修',
        path: 'device-repair',
      },
      {
        name: '设备保养',
        path: 'device-care',
      },
      {
        name: '设备巡检',
        path: 'device-check',
      },
      {
        name: '设备安装',
        path: 'device-add',
      },
      {
        name: '设备计量',
        path: 'device-calc',
      },
      {
        name: '派单管理',
        path: 'order-dispatch',
      },
    ],
  },
  {
    name: '部门信息',
    icon: 'bars',
    path: 'department',
    children: [
      {
        name: '部门树',
        path: 'department-tree',
      },
    ],
  },
  {
    name: '用户',
    icon: 'team',
    path: 'users',
    children: [
      {
        name: '用户列表',
        path: 'user-list',
      },
    ],
  } /*,
  {
    name: '列表信息',
    icon: 'table',
    path: 'list',
    children: [
      {
        name: '医院列表',
        path: 'hospital-list',
      },
      {
        name: '合同列表',
        path: 'contract-list',
      },
      {
        name: '采购列表',
        path: 'purchase-list',
      }

    ]
  }*/,
];

const menuData2 = [
  {
    name: '工作台',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '综合分析',
        path: 'analysis',
      },
    ],
  },
  {
    name: '设备',
    icon: 'api',
    path: 'device',
    children: [
      {
        name: '设备列表',
        path: 'device-list',
      },
      {
        name: '设备详情',
        path: 'device-detail',
        authority: 'invisible',
      },
      {
        name: '设备编辑',
        path: 'device-edit',
        authority: 'invisible',
      },
    ],
  },
  {
    name: '部门信息',
    icon: 'bars',
    path: 'department',
    children: [
      {
        name: '部门树',
        path: 'department-tree',
      },
    ],
  },
  {
    name: '报修信息',
    icon: 'tool',
    path: 'repair',
    children: [
      {
        name: '报修列表',
        path: 'repair-list',
      },
    ],
  },
  {
    name: '用户',
    icon: 'team',
    path: 'users',
    children: [
      {
        name: '用户列表',
        path: 'user-list',
      },
    ],
  } /*,
  {
    name: '列表信息',
    icon: 'table',
    path: 'list',
    children: [
      {
        name: '医院列表',
        path: 'hospital-list',
      },
      {
        name: '合同列表',
        path: 'contract-list',
      },
      {
        name: '采购列表',
        path: 'purchase-list',
      }

    ]
  }*/,
];
const menuData1 = [
  {
    name: 'dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '分析页',
        path: 'analysis',
      },
      {
        name: '监控页',
        path: 'monitor',
      },
      {
        name: '工作台',
        path: 'workplace',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
    ],
  },
  {
    name: '表单页',
    icon: 'form',
    path: 'form',
    children: [
      {
        name: '基础表单',
        path: 'basic-form',
      },
      {
        name: '分步表单',
        path: 'step-form',
      },
      {
        name: '高级表单',
        authority: 'admin',
        path: 'advanced-form',
      },
    ],
  },
  {
    name: '列表页',
    icon: 'table',
    path: 'list',
    children: [
      {
        name: '查询表格',
        path: 'table-list',
      },
      {
        name: '标准列表',
        path: 'basic-list',
      },
      {
        name: '卡片列表',
        path: 'card-list',
      },
      {
        name: '搜索列表',
        path: 'search',
        children: [
          {
            name: '搜索列表（文章）',
            path: 'articles',
          },
          {
            name: '搜索列表（项目）',
            path: 'projects',
          },
          {
            name: '搜索列表（应用）',
            path: 'applications',
          },
        ],
      },
    ],
  },
  {
    name: '详情页',
    icon: 'profile',
    path: 'profile',
    children: [
      {
        name: '基础详情页',
        path: 'basic',
      },
      {
        name: '高级详情页',
        path: 'advanced',
        authority: 'admin',
      },
    ],
  },
  {
    name: '结果页',
    icon: 'check-circle-o',
    path: 'result',
    children: [
      {
        name: '成功',
        path: 'success',
      },
      {
        name: '失败',
        path: 'fail',
      },
    ],
  },
  {
    name: '异常页',
    icon: 'warning',
    path: 'exception',
    children: [
      {
        name: '403',
        path: '403',
      },
      {
        name: '404',
        path: '404',
      },
      {
        name: '500',
        path: '500',
      },
      {
        name: '触发异常',
        path: 'trigger',
        hideInMenu: true,
      },
    ],
  },
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
