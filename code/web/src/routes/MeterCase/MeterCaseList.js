import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
} from 'antd';

import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './TableList.less';
import EngineerSelect from '../../components/biz/EngineerSelect';

const { TextArea } = Input;

const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const OperationForm = Form.create()(props => {
  const {
    modalVisible,
    form,
    handleModalVisible,
    currentCase,
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
        caseId: currentCase.caseId,
        modifier: user.currentUser.userId,
      };

      if (fieldsValue.assigneeUserId) {
        payload.assigneeUserId = fieldsValue.assigneeUserId;
      }

      dispatch({
        type: 'meterCase/changeState',
        payload,
        callback: success => {
          if (success) {
            message.success('操作成功');
            handleModalVisible(false);
            dispatch({
              type: 'meterCase/fetch',
              payload: {
                assigneeUserId: user.currentUser.userId,
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
      title += ` - 取消工单【${currentCase.caseId}】`;
      break;
    case 30:
      title += ` - 分配工单【${currentCase.caseId}】给工程师`;
      break;
    case 40:
      title += ` - 完成工单【${currentCase.caseId}】`;
      break;
  }

  let needSelectEngineer = toState == 30;

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
//

@connect(({ meterCase, loading, user }) => ({
  meterCase,
  user,
  loading: loading.models['meterCase/fetch'],
}))
@Form.create()
export default class MeterCaseList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    operation: {
      currentCase: null,
      modalVisible: false,
      formValues: {},
      toState: 0,
    },
  };

  componentDidMount() {
    const { dispatch, user } = this.props;
    dispatch({
      type: 'meterCase/fetch',
      payload: {
        assigneeUserId: user.currentUser.userId,
        pageIndex: 0,
        pageSize: 10,
      },
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      pageIndex: pagination.current - 1,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'meterCase/fetch',
      payload: {
        ...params,
      },
    });
  };

  handleFormReset = () => {
    const { form, dispatch, user } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'meterCase/fetch',
      payload: {
        assigneeUserId: user.currentUser.userId,
        pageIndex: 0,
        pageSize: 10,
      },
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form, user } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      let payload = {
        assigneeUserId: user.currentUser.userId,
      };

      for (let k in values) {
        if (values[k] !== undefined) {
          payload[k] = values[k];
        }
      }

      dispatch({
        type: 'meterCase/fetch',
        payload,
      });
    });
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="设备ID">
              {getFieldDecorator('deviceId')(<Input placeholder="请输入" />)}
              {/*{getFieldDecorator('deviceId')(<DeviceSelect placeholder="请输入" />)}*/}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              {/*<a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>*/}
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  changeCaseState(caseInfo, toState) {
    const { dispatch, user } = this.props;

    this.setState({
      operation: {
        ...this.state.operation,
        currentCase: caseInfo,
        modalVisible: true,
        toState: toState,
      },
    });
  }

  getCaseStateName(state) {
    const Names = {
      10: '新计量',
      20: '已取消',
      30: '计量中',
      40: '已完成',
      50: '已关闭',
    };

    return Names[state] || '未知';
  }

  getOperation(caseInfo, role) {
    let ops = [];
    if (caseInfo && role && caseInfo.caseState) {
      switch (caseInfo.caseState) {
        case 10:
          if (role === '调度') {
            ops.push(<Divider type={'vertical'} />);
            ops.push(
              <a onClick={this.changeCaseState.bind(this, caseInfo, 20)} title="取消工单">
                取消
              </a>
            );
            ops.push(<Divider type={'vertical'} />);
            ops.push(
              <a onClick={this.changeCaseState.bind(this, caseInfo, 30)} title="分配给工程师">
                分配
              </a>
            );
          }
          break;
        case 20:
          break;
        case 30:
          if (role === '驻场工程师') {
            ops.push(<Divider type={'vertical'} />);
            ops.push(
              <a onClick={this.changeCaseState.bind(this, caseInfo, 40)} title="完成维修">
                完成
              </a>
            );
          }
          break;
        case 40:
          if (role === '主管') {
            ops.push(<Divider type={'vertical'} />);
            ops.push(
              <a onClick={this.changeCaseState.bind(this, caseInfo, 50)} title="关闭">
                关闭
              </a>
            );
          }
          break;
        case 50:
          break;
      }
    }

    return ops;
  }

  render() {
    const { meterCase, loading, user, dispatch } = this.props;
    const { selectedRows, operation } = this.state;
    const roleName = user.currentUser.roleName;
    let list = [];
    meterCase.list.forEach(id => {
      list.push(meterCase.byIds[id]);
    });
    let data = {
      list,
      pagination: meterCase.pagination,
    };

    const columns = [
      {
        title: '工单ID',
        dataIndex: 'caseId',
      },
      {
        title: '设备ID',
        dataIndex: 'deviceId',
      },
      {
        title: '计量描述',
        dataIndex: 'caseRemark',
      },
      // {
      //   title: '所属医院',
      //   dataIndex: 'hospital',
      // },
      {
        title: '计量处理人',
        dataIndex: 'assigneeUserName',
      },
      {
        title: '状态',
        dataIndex: 'caseState',
        render: val => this.getCaseStateName.bind(this)(val, meterCase),
      },
      {
        title: '计量时间',
        dataIndex: 'createTime',
        // sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        render: val => <Fragment>{this.getOperation.bind(this)(val, roleName)}</Fragment>,
      },
    ];

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
      <PageHeaderLayout className={'MeterCaseList'} title="">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  {/* <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>*/}
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              rowKey={'caseId'}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <OperationForm
          {...opMethods}
          dispatch={dispatch}
          user={user}
          currentCase={operation.currentCase}
          toState={operation.toState}
          modalVisible={operation.modalVisible}
        />
      </PageHeaderLayout>
    );
  }
}
