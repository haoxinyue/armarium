import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Badge, Table, Divider, Modal, Button, Tabs, Steps, Icon, Timeline } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../Profile/BasicProfile.less';
import styles_1 from './StocktakingCaseDetail.less';

const TabPane = Tabs.TabPane;

const { Description } = DescriptionList;

@connect(({ stocktakingCase, loading }) => ({
  stocktakingCase,
  loading: loading.effects['stocktakingCase/fetchDetail'],
}))
export default class StocktakingCaseDetail extends Component {
  constructor(p) {
    super(p);
    this.state = {
      imageVisible: false,
      imageSrc: null,

      deviceList: [],
      pagination: {
        pageSize: 10,
        current: 0,
        total: 0,
      },
    };
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'stocktakingCase/fetchDetail',
      payload: {
        caseId: match.params.caseId,
      },
    });
    this.loadDevice(match.params.caseId);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { dispatch, match: { params: { caseId } } } = this.props;
    const { match: { params: { caseId: NextCaseId } } } = nextProps;
    if (NextCaseId && NextCaseId !== caseId) {
      dispatch({
        type: 'stocktakingCase/fetchDetail',
        payload: { caseId: NextCaseId },
      });
      this.loadDevice(NextCaseId);
      return true;
    }
    return true;
  }

  handleTableChange(pagination, filters, sorter) {
    const { match } = this.props;

    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });

    this.loadDevice(match.params.caseId, pager.current);
  }

  loadDevice(caseId, pageIndex = 1) {
    const { dispatch } = this.props;
    dispatch({
      type: 'stocktakingCase/fetchDetailDevice',
      payload: {
        caseId,
        pageSize: this.state.pagination.pageSize,
        pageIndex: pageIndex - 1,
      },
    }).then(res => {
      console.log('devices', res);
      let pagination = {
        ...this.state.pagination,
        current: pageIndex,
        total: res.total,
      };
      this.setState({
        deviceList: res.list || [],
        pagination,
      });
    });
  }

  render() {
    const { stocktakingCase, loading, match } = this.props;
    const { caseId } = match.params;
    const { deviceList, pagination } = this.state;

    let currentDetail = stocktakingCase.byIds[caseId] || {};
    const statusMap = {
      '10': '待处理',
      '20': '已取消',
      '30': '处理中',
      '40': '已完成',
      '50': '已关闭',
    };

    const columns = [
      {
        title: '设备ID',
        dataIndex: 'deviceId',
        key: 'deviceId',
      },
      {
        title: '设备名称',
        dataIndex: 'deviceName',
        key: 'deviceName',
      },
      {
        title: '盘点人',
        dataIndex: 'operationUserName',
        key: 'operationUserName',
      },
      {
        title: '盘点状态',
        dataIndex: 'operationStateName',
        key: 'operationStateName',
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      },
      {
        title: '盘点时间',
        dataIndex: 'operationTime',
        key: 'operationTime',
      },
    ];

    return (
      <PageHeaderLayout title="">
        <Tabs defaultActiveKey="1" type="card" mode={'left'}>
          <TabPane tab="基本信息" key="1">
            <Card bordered={false} style={{ position: 'relative', padding: 0 }}>
              <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }}>
                <Description term="工单ID">{currentDetail.caseId}</Description>
                <Description term="所属科室">{currentDetail.deptNameArr}</Description>
              </DescriptionList>

              <Divider style={{ marginBottom: 32 }} />
              <DescriptionList size="large" title="状态" style={{ marginBottom: 32 }}>
                <Description term="工单状态">{statusMap[currentDetail.caseState]}</Description>
                <Description term="盘点人">{currentDetail.assigneeUserName}</Description>
                <Description term="计划开始时间">{currentDetail.planBeginTime}</Description>
                <Description term="计划结束时间">{currentDetail.planEndTime}</Description>
                <Description term="实际盘点时间">{currentDetail.actualTime}</Description>
              </DescriptionList>
            </Card>
          </TabPane>
          <TabPane tab="设备列表" key="2">
            <Table
              style={{ backgroundColor: 'white' }}
              rowKey={record => record.deviceId}
              onChange={this.handleTableChange.bind(this)}
              pagination={pagination}
              dataSource={deviceList}
              columns={columns}
            />
          </TabPane>
        </Tabs>
      </PageHeaderLayout>
    );
  }
}
