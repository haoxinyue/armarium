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
import DeviceSelect from '../../components/biz/DeviceSelect';
import EngineerSelect from '../../components/biz/EngineerSelect';

const statusMap = { '10': '待维修', '20': '已取消', '30': '维修中', '40': '已完成','50':'已关闭' };

const { TextArea } = Input;

const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="新增报修"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="报修设备">
        {form.getFieldDecorator('deviceId', {
          rules: [{ required: true, message: '请选择报修设备...' }],
        })(<DeviceSelect placeholder="请选择报修设备" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="报修描述">
        {form.getFieldDecorator('caseRemark', {
          rules: [{ required: true, message: '请输入设备Id...' }],
        })(<TextArea style={{ minHeight: 32 }} placeholder="请输入描述信息" rows={4} />)}
      </FormItem>
    </Modal>
  );
});

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
        deviceId: currentRepair.deviceId,
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
              type: 'repair/fetch',
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
      title += ` - 取消工单【${currentRepair.caseId}】`;
      break;
    case 30:
      title += ` - 分配工单【${currentRepair.caseId}】给工程师`;
      break;
    case 40:
      title += ` - 完成工单【${currentRepair.caseId}】`;
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

@connect(({ repair, loading, user }) => ({
  repair,
  user,
  loading: loading.models['repair/fetch'],
}))
@Form.create()
export default class RepairList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    operation: {
      currentRepair: null,
      modalVisible: false,
      formValues: {},
      toState: 0,
    },
  };

  componentDidMount() {
    const { dispatch, user } = this.props;
    dispatch({
      type: 'repair/fetch',
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
      type: 'repair/fetch',
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
      type: 'repair/fetch',
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

    const { dispatch, form, user ,repair} = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      repair.pagination.current =1;

      console.log(repair.pagination)

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      let payload = {
        assigneeUserId: user.currentUser.userId,
        pageIndex: 0,
        pageSize: 10,
      };

      for (let k in values) {
        if (values[k] !== undefined) {
          payload[k] = values[k];
        }
      }

      dispatch({
        type: 'repair/fetch',
        payload,
      });
    });
  };

  handleModalVisible = flag => {
    const { dispatch } = this.props;
    // dispatch(routerRedux.push('/repair/repair-add'))
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = fields => {
    const { user = {}, dispatch } = this.props;
    const currentUserId = user.currentUser.userId;

    dispatch({
      type: 'repair/add',
      payload: {
        ...fields,
        reporterUserId: currentUserId,
        creater: currentUserId,
        modifier: currentUserId,
      },
      callback: success => {
        if (success) {
          message.success('报修成功');
          this.setState({
            modalVisible: false,
          });

          dispatch({
            type: 'repair/fetch',
            payload: {
              assigneeUserId: user.currentUser.userId,
              pageIndex: 0,
              pageSize: 10,
            },
          });
        } else {
          message.success('报修失败，请稍后再试');
        }
      },
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
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('caseState')(
                <Select placeholder={`工单状态`}>
                  <Select.Option key={-1} value={''}>
                    全部
                  </Select.Option>
                  {Object.keys(statusMap).map(op => (
                    <Select.Option key={op} value={Number(op)}>
                      {statusMap[op]}
                    </Select.Option>
                  ))}
                </Select>
              )}
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
        currentRepair: caseInfo,
        modalVisible: true,
        toState: toState,
      },
    });
  }

  getCaseStateName(state) {
    const Names = {
      10: '新报修',
      20: '已取消',
      30: '维修中',
      40: '已完成',
      50: '已关闭',
    };

    return Names[state] || '未知';
  }

  getOperation(caseInfo, role) {
    let ops = [];
    ops.push(
      <Link to={'/repair/repair-detail/' + caseInfo.caseId} title="进入详情">
        详情
      </Link>
    );
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
    const { repair, loading, user, dispatch } = this.props;
    const { selectedRows, modalVisible, operation } = this.state;
    const roleName = user.currentUser.roleName;
    let list = [];
    repair.list.forEach(id => {
      list.push(repair.byIds[id]);
    });
    let data = {
      list,
      pagination: repair.pagination,
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
        title: '报修描述',
        dataIndex: 'caseRemark',
      },
      // {
      //   title: '所属医院',
      //   dataIndex: 'hospital',
      // },
      {
        title: '维修人',
        dataIndex: 'assigneeUserName',
      },
      {
        title: '状态',
        dataIndex: 'caseState',
        render: val => this.getCaseStateName.bind(this)(val, repair),
      },
      {
        title: '报修时间',
        dataIndex: 'createTime',
        // sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        render: val => <Fragment>{this.getOperation.bind(this)(val, roleName)}</Fragment>,
      },
    ];

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

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
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
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
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
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
