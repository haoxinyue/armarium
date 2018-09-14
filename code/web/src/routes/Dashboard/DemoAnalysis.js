import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
} from 'antd';
import numeral from 'numeral';
import {
  ChartCard,
  yuan,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  BarCompare,
  Pie,
  TimelineChart,
} from 'components/Charts';
import {
  G2,
  Chart,
  Tooltip as ChartTooltip,
  Axis,
  Legend,
  Label as ChartLabel,
  Geom,
  Coord,
} from 'bizcharts';
import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';
import { getTimeDistance } from '../../utils/utils';

import styles from './Analysis.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const rankingListData = [];
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
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: depts[i],
    total: Math.ceil(Math.random() * 100),
  });
}
rankingListData.sort((a, b) => {
  return b.total - a.total;
});

const Yuan = ({ children }) => (
  <span
    dangerouslySetInnerHTML={{ __html: yuan(children) }}
  /> /* eslint-disable-line react/no-danger */
);

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
export default class DemoAnalysis extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'chart/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

  handleRangePickerChange = rangePickerValue => {
    this.setState({
      rangePickerValue,
    });

    this.props.dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  selectDate = type => {
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    this.props.dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  isActive(type) {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
  }

  render() {
    const { rangePickerValue, salesType, currentTabKey } = this.state;
    const { chart, loading } = this.props;
    const {
      visitData,
      visitData2,
      salesData,
      searchData,
      offlineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
      deviceStatData,
    } = chart;

    const salesPieData =
      salesType === 'all'
        ? salesTypeData
        : salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;

    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );

    const iconGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    );

    const salesExtra = (
      <div className={styles.salesExtraWrap}>
        <div className={styles.salesExtra}>
          <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
            今日
          </a>
          <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
            本周
          </a>
          <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
            本月
          </a>
          <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
            全年
          </a>
        </div>
        <RangePicker
          value={rangePickerValue}
          onChange={this.handleRangePickerChange}
          style={{ width: 256 }}
        />
      </div>
    );

    const columns = [
      {
        title: '排名',
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: '搜索关键词',
        dataIndex: 'keyword',
        key: 'keyword',
        render: text => <a href="/">{text}</a>,
      },
      {
        title: '用户数',
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
        className: styles.alignRight,
      },
      {
        title: '周涨幅',
        dataIndex: 'range',
        key: 'range',
        sorter: (a, b) => a.range - b.range,
        render: (text, record) => (
          <Trend flag={record.status === 1 ? 'down' : 'up'}>
            <span style={{ marginRight: 4 }}>{text}%</span>
          </Trend>
        ),
        align: 'right',
      },
    ];

    const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);

    const CustomTab = ({ data, currentTabKey: currentKey }) => (
      <Row gutter={8} style={{ width: 138, margin: '8px 0' }}>
        <Col span={12}>
          <NumberInfo
            title={data.name}
            subTitle="使用率"
            gap={2}
            total={`${data.cvr * 100}%`}
            theme={currentKey !== data.name && 'light'}
          />
        </Col>
        <Col span={12} style={{ paddingTop: 36 }}>
          <Pie
            animate={false}
            color={currentKey !== data.name && '#BDE4FF'}
            inner={0.55}
            tooltip={false}
            margin={[0, 0, 0, 0]}
            percent={data.cvr * 100}
            height={64}
          />
        </Col>
      </Row>
    );

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    let chart_1 = {
      data_1: [
        {
          item: '自修',
          percent: 0.3,
        },
        {
          item: '厂家维修',
          percent: 0.55,
        },
        {
          item: '第三方维修',
          percent: 0.15,
        },
      ],
      cols: {
        percent: {
          formatter: val => {
            val = (val * 100).toFixed(0) + '%';
            return val;
          },
        },
      },
    };

    let chart_2 = {
      height: 280,
      data: [
        {
          count: 10,
          price: 1600,
          weight: 8,
        },
        {
          count: 10,
          price: 2000,
          weight: 40,
        },
        {
          count: 30,
          price: 6000,
          weight: 10,
        },
        {
          count: 21,
          price: 3000,
          weight: 11,
        },
        {
          count: 40,
          price: 4000,
          weight: 30,
        },
        {
          count: 60,
          price: 1200,
          weight: 15,
        },
        {
          count: 80,
          price: 1300,
          weight: 10,
        },
        {
          count: 2,
          price: 1600,
          weight: 1,
        },
      ],
      cols: {
        count: {
          alias: '维修次数（次）',
          tickInterval: 10,
        },
        price: {
          // type: "pow",
          alias: '设备价格（元）',
          tickInterval: 1000,
        },
      },
    };

    return (
      <Fragment>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="维修分析"
              action={
                <Tooltip title="维修分析">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={''}
              footer={<Field label="维修总次数" value={numeral(124).format('0,0')} />}
              contentHeight={46}
            >
              <Chart
                height={130}
                data={chart_1.data_1}
                scale={chart_1.cols}
                padding={[10, 10, 0, 40]}
                style={{ marginBottom: -20 }}
                forceFit
              >
                <Coord type="theta" radius={0.75} />
                <Axis name="percent" />
                <Legend
                  name={'item'}
                  layout={'vertical'}
                  position="left"
                  offsetY={-10}
                  offsetX={50}
                />
                <ChartTooltip
                  showTitle={false}
                  itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                />
                <Geom
                  type="intervalStack"
                  position="percent"
                  color="item"
                  tooltip={[
                    'item*percent',
                    (item, percent) => {
                      percent = (percent * 100).toFixed(0) + '%';
                      return {
                        name: item,
                        value: percent,
                      };
                    },
                  ]}
                  style={{
                    lineWidth: 1,
                    stroke: '#fff',
                  }}
                >
                  <ChartLabel
                    content="percent"
                    offset={-19}
                    textStyle={{
                      fontSize: 12,
                      rotate: 0,
                      textAlign: 'center',
                      shadowBlur: 2,
                      shadowColor: 'rgba(0, 0, 0, .45)',
                    }}
                  />
                </Geom>
              </Chart>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="报修统计"
              action={
                <Tooltip title="报修统计">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(88).format('0,0')}
              footer={<Field label="日报修次数" value={numeral(5).format('0,0')} />}
              contentHeight={46}
            >
              <MiniArea color="#975FE4" data={visitData} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="设备安装统计"
              action={
                <Tooltip title="设备安装">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(9480).format('0,0') + '万元'}
              footer={<Field label="安装完成率" value="60%" />}
              contentHeight={46}
            >
              <MiniBar data={visitData} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="维护总支出"
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total="32,8万元"
              footer={
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  <Trend flag="up" style={{ marginRight: 16 }}>
                    同比<span className={styles.trendText}>12%</span>
                  </Trend>
                  {/*<Trend flag="down">
                    环比<span className={styles.trendText}>11%</span>
                  </Trend>*/}
                </div>
              }
              contentHeight={46}
            >
              <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
            </ChartCard>
          </Col>
        </Row>

        <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={styles.salesCard}>
            <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{ marginBottom: 24 }}>
              <TabPane tab="设备分布" key="sales">
                <Chart
                  height={chart_2.height}
                  data={chart_2.data}
                  scale={chart_2.cols}
                  padding={[30, 90, 80, 90]}
                  forceFit
                >
                  <Tooltip />
                  <Axis
                    name="count"
                    title={{
                      position: 'end',
                    }}
                    label={{
                      formatter: value => {
                        return value;
                      }, // 格式化坐标轴的显示
                    }}
                  />
                  <Axis
                    name="price"
                    title={{
                      position: 'end',
                    }}
                  />
                  <Geom
                    type="point"
                    position="count*price"
                    tooltip="price*count"
                    opacity={0.65}
                    shape="circle"
                    size={['weight', [4, 20]]}
                    style={[
                      'continent',
                      {
                        lineWidth: 1,
                        strokeOpacity: 1,
                        fillOpacity: 0.3,
                        opacity: 0.65,
                      },
                    ]}
                  />
                </Chart>
              </TabPane>
              <TabPane tab="设备绩效" key="views">
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <BarCompare height={292} title="设备绩效统计" data={deviceStatData} />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>部门设备情况（台）</h4>
                      <ul className={styles.rankingList}>
                        {rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                            <span>{item.title}</span>
                            <span>{numeral(item.total).format('0,0')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Card>
        <Card
          loading={loading}
          className={styles.offlineCard}
          bordered={false}
          bodyStyle={{ padding: '0 0 32px 0' }}
          style={{ marginTop: 32 }}
        >
          <Tabs activeKey={activeKey} onChange={this.handleTabChange}>
            {offlineData.map(shop => (
              <TabPane tab={<CustomTab data={shop} currentTabKey={activeKey} />} key={shop.name}>
                <div style={{ padding: '0 24px' }}>
                  <TimelineChart
                    height={400}
                    data={offlineChartData}
                    titleMap={{ y1: '完好率', y2: '使用率', y3: '超负荷率', y4: '强检率' }}
                  />
                </div>
              </TabPane>
            ))}
          </Tabs>
        </Card>
        {/*<Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              bordered={false}
              title="线上热门搜索"
              extra={iconGroup}
              style={{ marginTop: 24 }}
            >
              <Row gutter={68}>
                <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                  <NumberInfo
                    subTitle={
                      <span>
                        搜索用户数
                        <Tooltip title="指标文案">
                          <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
                        </Tooltip>
                      </span>
                    }
                    gap={8}
                    total={numeral(12321).format('0,0')}
                    status="up"
                    subTotal={17.1}
                  />
                  <MiniArea line height={45} data={visitData2} />
                </Col>
                <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                  <NumberInfo
                    subTitle="人均搜索次数"
                    total={2.7}
                    status="down"
                    subTotal={26.2}
                    gap={8}
                  />
                  <MiniArea line height={45} data={visitData2} />
                </Col>
              </Row>
              <Table
                rowKey={record => record.index}
                size="small"
                columns={columns}
                dataSource={searchData}
                pagination={{
                  style: { marginBottom: 0 },
                  pageSize: 5,
                }}
              />
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="销售额类别占比"
              bodyStyle={{ padding: 24 }}
              extra={
                <div className={styles.salesCardExtra}>
                  {iconGroup}
                  <div className={styles.salesTypeRadio}>
                    <Radio.Group value={salesType} onChange={this.handleChangeSalesType}>
                      <Radio.Button value="all">全部渠道</Radio.Button>
                      <Radio.Button value="online">线上</Radio.Button>
                      <Radio.Button value="offline">门店</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              }
              style={{ marginTop: 24, minHeight: 509 }}
            >
              <h4 style={{ marginTop: 8, marginBottom: 32 }}>销售额</h4>
              <Pie
                hasLegend
                subTitle="销售额"
                total={() => <Yuan>{salesPieData.reduce((pre, now) => now.y + pre, 0)}</Yuan>}
                data={salesPieData}
                valueFormat={value => <Yuan>{value}</Yuan>}
                height={248}
                lineWidth={4}
              />
            </Card>
          </Col>
        </Row>*/}
      </Fragment>
    );
  }
}
