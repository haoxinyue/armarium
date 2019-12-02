import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import { Card, Timeline, Divider, Modal, Button, Form, Input, message } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../Profile/BasicProfile.less';

import EngineerSelect from '../../components/biz/EngineerSelect';

const { Description } = DescriptionList;
const FormItem = Form.Item;
const { TextArea } = Input;
const OperationForm = Form.create()(props => {
  const {
    modalVisible,
    form,
    handleModalVisible,
    currentRepair,
    toState = '',
    dispatch,
    user,
  } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      let payload = {
        reporterUserId: user.currentUser.userId,
        caseState: toState,
        caseId: currentRepair.caseId,
        modifier: user.currentUser.userId,
      };
      if (fieldsValue.assigneeUserId) {
        payload.assigneeUserId = fieldsValue.assigneeUserId;
      }
      if (fieldsValue.caseRemark) {
        payload.caseRemark = fieldsValue.caseRemark;
      }

      dispatch({
        type: 'repair/changeState',
        payload,
        callback: success => {
          if (success) {
            message.success('操作成功');
            handleModalVisible(false);
            dispatch({
              type: 'repair/fetchDetail',
              payload: {
                caseId: currentRepair.caseId,
              },
            });
          } else {
            message.error('操作失败');
          }
        },
      });
    });
  };

  let title = '操作';

  switch (toState) {
    case 20:
      title += ` - 取消工单【${currentRepair.caseId}】`;
      break;
    case 30:
      title += ` - 分配工单【${currentRepair.caseId}】给工程师`;
      break;
    case 40:
      title += ` - 完成工单【${currentRepair.caseId}】`;
      break;
  }

  let needSelectEngineer = toState == 30 && currentRepair.caseState !== 30;

  return (
    <Modal
      title={title}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      {needSelectEngineer && (
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="分配工程师">
          {form.getFieldDecorator('assigneeUserId', {
            rules: [{ required: true, message: '请选择工程师...' }],
          })(<EngineerSelect placeholder="请选择工程师" />)}
        </FormItem>
      )}

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述信息">
        {form.getFieldDecorator('caseRemark', {
          rules: [{ required: true, message: '请输入描述信息' }],
        })(<TextArea style={{ minHeight: 32 }} placeholder="请输入描述信息" rows={4} />)}
      </FormItem>
    </Modal>
  );
});

@connect(({ repair, loading, user }) => ({
  repair,
  user,
  loading: loading.effects['repair/fetchDetail'],
}))
export default class RepairDetail extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'repair/fetchDetail',
      payload: {
        caseId: match.params.caseId,
      },
    });
  }

  state = {
    operation: {
      currentRepair: null,
      modalVisible: false,
      formValues: {},
      toState: 0,
    },
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { dispatch, match: { params: { caseId } } } = this.props;
    const { match: { params: { caseId: NextCaseId } } } = nextProps;
    if (NextCaseId && NextCaseId !== caseId) {
      dispatch({
        type: 'repair/fetchDetail',
        payload: { caseId: NextCaseId },
      });
      return true;
    }
    return true;
  }

  changeCaseState(caseInfo, toState) {
    this.setState({
      operation: {
        ...this.state.operation,
        currentRepair: caseInfo,
        modalVisible: true,
        toState: toState,
      },
    });
  }

  closeCase(userId) {
    const { dispatch, match: { params: { caseId } } } = this.props;
    dispatch({
      type: 'repair/close',
      payload: {
        caseId: caseId,
        modifier: userId,
      },
    }).then(() => {
      dispatch({
        type: 'repair/fetchDetail',
        payload: { caseId: caseId },
      });
    });
  }

  getOperation(caseInfo, role) {
    const { user } = this.props;
    const userId = user.currentUser.userId;
    let ops = [];
    if (caseInfo && role && caseInfo.caseState) {
      switch (caseInfo.caseState) {
        case 10:
          if (role === '调度') {
            ops.push(
              <Button
                type="primary"
                onClick={this.changeCaseState.bind(this, caseInfo, 20)}
                title="取消工单"
              >
                取消工单
              </Button>
            );
            ops.push(<span>&nbsp;</span>);
            ops.push(
              <Button
                type="primary"
                onClick={this.changeCaseState.bind(this, caseInfo, 30)}
                title="分配给工程师"
              >
                分配给工程师
              </Button>
            );
          }
          break;
        case 20:
          break;
        case 30:
          if (role === '运维工程师') {
            ops.push(
              <Button
                type="primary"
                onClick={this.changeCaseState.bind(this, caseInfo, 40)}
                title="完成维修"
              >
                完成维修
              </Button>
            );
            ops.push(<span>&nbsp;</span>);
            ops.push(
              <Button
                type="primary"
                onClick={this.changeCaseState.bind(this, caseInfo, 30)}
                title="完成维修"
              >
                添加描述
              </Button>
            );
          }
          break;
        case 40:
          if (role === '科室负责人' || role === '科室人员') {
            //自己上报的自己关闭
            if (caseInfo.reporterUserId === userId) {
              ops.push(
                <Button type="primary" onClick={this.closeCase.bind(this, userId)} title="关闭工单">
                  关闭工单
                </Button>
              );
            }
          }
          break;
        case 50:
          break;
      }
    }

    if (ops.length === 0) {
      ops.push(<span>无</span>);
    }

    return ops;
  }

  render() {
    const { repair, match, user, dispatch } = this.props;
    const { operation } = this.state;
    const { caseId } = match.params;
    const info = repair.byIds[caseId] || {};
    const roleName = user.currentUser.roleName;
    const timeShaft = info.timeShaft || [];

    function getTimeLineItem(data) {
      let statusStr = '';
      switch (data.caseState) {
        case 10:
          statusStr = '创建报修';
          break;
        case 20:
          statusStr = '取消报修';
          break;
        case 25:
          statusStr = '已派单';
          break;
        case 30:
          statusStr = '开始维修';
          break;
        case 40:
          statusStr = '完成维修';
          break;
        case 50:
          statusStr = '关闭工单';
          break;
      }

      let timeStr = moment(data.createTime).format('YYYY/MM/DD HH:mm:ss');

      return (
        <Timeline.Item>
          {statusStr} - {timeStr}{' '}
        </Timeline.Item>
      );
    }
    let pending = '';
    switch (info.caseState) {
      case 10:
        pending = '等待分配...';
        break;
      case 20:
        pending = false;
        break;
      case 30:
        pending = '维修处理中...';
        break;
      case 40:
        pending = '等待关闭...';
        break;
      case 50:
        pending = false;
        break;
      default:
        pending = false;
        break;
    }

    const opMethods = {
      handleModalVisible: flag => {
        this.setState({
          operation: {
            ...this.state.operation,
            modalVisible: !!flag,
          },
        });
      },
    };

    return (
      <PageHeaderLayout title="">
        <Card bordered={false} style={{ position: 'relative' }}>
          <DescriptionList size="large" title="报修信息" style={{ marginBottom: 32 }}>
            <Description term="报修人">{info.reporterWeixin || info.reporterUserId}</Description>
            <Description term="设备名称">{info.deviceName}</Description>
            <Description term="所属医院">{info.hospital}</Description>
            <Description term="所属部门">{info.deptName}</Description>
            <Description term="备注">{info.caseRemark}</Description>
          </DescriptionList>
        </Card>

        <Card bordered={false} style={{ position: 'relative' }}>
          <DescriptionList size="large" title="进度信息" style={{ marginBottom: 32 }} />
          <Timeline pending={pending}>{timeShaft.map(d => getTimeLineItem(d))}</Timeline>
        </Card>

        <Card bordered={false} style={{ position: 'relative' }}>
          <DescriptionList size="large" title="操作" style={{ marginBottom: 32 }}>
            {this.getOperation.bind(this)(info, roleName)}
          </DescriptionList>
        </Card>
        <OperationForm
          {...opMethods}
          dispatch={dispatch}
          user={user}
          currentRepair={operation.currentRepair}
          toState={operation.toState}
          modalVisible={operation.modalVisible}
        />
      </PageHeaderLayout>
    );
  }
}
