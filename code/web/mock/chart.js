const moment = require('moment');

// mock data
const visitData = [];
const beginDay = new Date().getTime();

const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i],
  });
}

const visitData2 = [];
const fakeY2 = [1, 6, 4, 8, 3, 7, 2];
for (let i = 0; i < fakeY2.length; i += 1) {
  visitData2.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY2[i],
  });
}

const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}

const deviceStatData = [];
const deviceTypes = ['口腔', '超声', '影像', '电子仪器', '内窥', '激光高频', '检验生化'];
for (let i = 0; i < deviceTypes.length; i += 1) {
  let y = Math.floor(Math.random() * 30);
  if (y < 5) {
    y = Math.floor(Math.random() * 30);
  }
  deviceStatData.push({
    x: deviceTypes[i],
    y: y,
    y1: Math.floor(Math.random() * y),
  });
}

const searchData = [];
for (let i = 0; i < 50; i += 1) {
  searchData.push({
    index: i + 1,
    keyword: `搜索关键词-${i}`,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2),
  });
}
const salesTypeData = [
  {
    x: '家用电器',
    y: 4544,
  },
  {
    x: '食用酒水',
    y: 3321,
  },
  {
    x: '个护健康',
    y: 3113,
  },
  {
    x: '服饰箱包',
    y: 2341,
  },
  {
    x: '母婴产品',
    y: 1231,
  },
  {
    x: '其他',
    y: 1231,
  },
];

const salesTypeDataOnline = [
  {
    x: '家用电器',
    y: 244,
  },
  {
    x: '食用酒水',
    y: 321,
  },
  {
    x: '个护健康',
    y: 311,
  },
  {
    x: '服饰箱包',
    y: 41,
  },
  {
    x: '母婴产品',
    y: 121,
  },
  {
    x: '其他',
    y: 111,
  },
];

const salesTypeDataOffline = [
  {
    x: '家用电器',
    y: 99,
  },
  {
    x: '个护健康',
    y: 188,
  },
  {
    x: '服饰箱包',
    y: 344,
  },
  {
    x: '母婴产品',
    y: 255,
  },
  {
    x: '其他',
    y: 65,
  },
];

const offlineData = [];
const depts = [
  '手术室',
  '检验科',
  '内镜中心',
  '血液透析室',
  '超声科',
  '影像科',
  '病房',
  '体检中心',
  '卫生科',
  '心血管科',
];

const percents = [0.9, 0.81, 0.73, 0.6, 0.7, 0.8, 0.81, 0.84, 0.6, 0.73, 0.82];
for (let i = 0; i < depts.length; i += 1) {
  offlineData.push({
    name: depts[i], //`门店${i}`,
    // cvr: Math.ceil((Math.random() * 0.4 +0.6)*10) / 10,
    cvr: percents[i],
  });
}

const offlineChartData = [];
for (let i = 0; i < 20; i += 1) {
  offlineChartData.push({
    x: new Date().getTime() + 1000 * 60 * 60 * 24 * 30 * (i - 20),
    y1: Math.floor(Math.random() * 100),
    y2: Math.floor(Math.random() * 100),
    y3: Math.floor(Math.random() * 100),
    y4: Math.floor(Math.random() * 100),
  });
}

const radarOriginData = [
  {
    name: '个人',
    ref: 10,
    koubei: 8,
    output: 4,
    contribute: 5,
    hot: 7,
  },
  {
    name: '团队',
    ref: 3,
    koubei: 9,
    output: 6,
    contribute: 3,
    hot: 1,
  },
  {
    name: '部门',
    ref: 4,
    koubei: 1,
    output: 6,
    contribute: 5,
    hot: 7,
  },
];

//
const radarData = [];
const radarTitleMap = {
  ref: '引用',
  koubei: '口碑',
  output: '产量',
  contribute: '贡献',
  hot: '热度',
};
radarOriginData.forEach(item => {
  Object.keys(item).forEach(key => {
    if (key !== 'name') {
      radarData.push({
        name: item.name,
        label: radarTitleMap[key],
        value: item[key],
      });
    }
  });
});

// export const getFakeChartData = {
//   visitData,
//   visitData2,
//   salesData,
//   searchData,
//   offlineData,
//   offlineChartData,
//   salesTypeData,
//   salesTypeDataOnline,
//   salesTypeDataOffline,
//   radarData,
//   deviceStatData,
// };
//
// export default {
//   getFakeChartData,
// };

const getFakeChartData = {
  visitData,
  visitData2,
  salesData,
  searchData,
  offlineData,
  offlineChartData,
  salesTypeData,
  salesTypeDataOnline,
  salesTypeDataOffline,
  radarData,
  deviceStatData,
};

module.exports = { getFakeChartData };
