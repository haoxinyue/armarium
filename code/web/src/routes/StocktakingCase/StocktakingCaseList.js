import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { routerRedux } from 'dva/router';
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
  Checkbox,
  message,
  Badge,
} from 'antd';

const { RangePicker } = DatePicker;
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import HospitalSelect from '../../components/biz/HospitalSelect';
import DepartmentSelect from '../../components/biz/DepartmentSelect';
import moment from 'moment';

import styles from './TableList.less';
import EngineerSelect from '../../components/biz/EngineerSelect';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const statusMap = { '10': '待盘点', '20': '已取消', '30': '盘点中', '50': '已完成' };

@Form.create()
class CreateForm extends PureComponent {
  state = {
    hospitalId: null,
  };

  render() {
    const { modalVisible, form, handleAdd, handleModalVisible } = this.props;

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        handleAdd(fieldsValue, form);
      });
    };

    const onStartTimeChange = startValue => {
      if (startValue) {
        const endValue = form.getFieldValue('planEndTime');
        if (endValue && endValue <= startValue) {
          form.setFieldsValue({ planEndTime: null });
        }
      }
    };

    const disableEndDate = endValue => {
      const startValue = form.getFieldValue('planBeginTime');
      if (!endValue || !startValue) {
        return false;
      }
      return endValue.valueOf() <= startValue.valueOf();
    };

    return (
      <Modal
        title="新建盘点计划"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
      >
        <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="主题">
          {form.getFieldDecorator('caseSubject', {
            initialValue: '新建盘点',
            rules: [{ required: false, message: '请输入主题...' }],
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="医院">
          {form.getFieldDecorator('hospitalId', {
            rules: [{ required: true, message: '请选择医院...' }],
            onChange: val => {
              this.setState({
                hospitalId: val,
              });
            },
          })(<HospitalSelect placeholder="请选择医院" />)}
        </FormItem>

        <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="科室">
          {form.getFieldDecorator('depts', {
            rules: [{ required: true, message: '请选择部门...' }],
          })(
            <DepartmentSelect
              hospitalId={this.state.hospitalId}
              multiple
              placeholder="请选择部门"
            />
          )}
        </FormItem>

        <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="指派给">
          {form.getFieldDecorator('assigneeUserId', {
            rules: [{ required: true, message: '请选择工程师...' }],
          })(<EngineerSelect placeholder="请选择工程师" />)}
        </FormItem>

        <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="计划开始时间">
          {form.getFieldDecorator('planBeginTime', {
            onChange: onStartTimeChange,
            rules: [{ required: true, message: '请选择时间...' }],
          })(<DatePicker format="YYYY/MM/DD" placeholder="请选择时间" />)}
        </FormItem>

        <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="计划结束时间">
          {form.getFieldDecorator('planEndTime', {
            rules: [{ required: true, message: '请选择时间...' }],
          })(
            <DatePicker
              disabledDate={disableEndDate}
              format="YYYY/MM/DD"
              placeholder="请选择时间"
            />
          )}
        </FormItem>
      </Modal>
    );
  }
}

@connect(({ stocktakingCase, user, loading }) => ({
  stocktakingCase,
  currentUser: user.currentUser || {},
  loading: loading.models['stocktakingCase/fetch'],
}))
@Form.create()
export default class StocktakingCaseList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    pagination: { current: 0, defaultCurrent: 0, defaultPageSize: 10, pageSize: 10 },
  };

  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'stocktakingCase/fetch',
    //   payload: {
    //     // assigneeUserId: 10003,
    //     pageIndex: 0,
    //     pageSize: 10,
    //   },
    // });
    this.refreshTable();
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch, form, currentUser } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const params = {
        pageIndex: pagination.current - 1,
        pageSize: pagination.pageSize,
        userId: currentUser.userId,
        // roleName: currentUser.roleName
      };

      for (let k in fieldsValue) {
        if (fieldsValue[k] !== undefined) {
          if (k === 'planBeginTimeRange') {
            let times = fieldsValue[k].map(
              (d, i) =>
                i === 0
                  ? moment(d).format('YYYY/MM/DD 00:00:00')
                  : moment(d).format('YYYY/MM/DD 23:59:59')
            );
            params.planBeginTimeFrom = times[0];
            params.planBeginTimeTo = times[1];
          } else {
            params[k] = fieldsValue[k];
          }
        }
      }

      dispatch({
        type: 'stocktakingCase/fetch',
        payload: params,
      });
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });

    this.refreshTable();
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form, currentUser } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      let payload = {
        pageIndex: this.state.pagination.current,
        pageSize: this.state.pagination.pageSize,
        userId: currentUser.userId,
        // roleName: currentUser.roleName
      };

      for (let k in values) {
        if (values[k] !== undefined) {
          if (k === 'planBeginTimeRange') {
            let times = values[k].map(
              (d, i) =>
                i === 0
                  ? moment(d).format('YYYY/MM/DD 00:00:00')
                  : moment(d).format('YYYY/MM/DD 23:59:59')
            );
            payload.planBeginTimeFrom = times[0];
            payload.planBeginTimeTo = times[1];
          } else {
            payload[k] = values[k];
          }
        }
      }

      dispatch({
        type: 'stocktakingCase/fetch',
        payload,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  refreshTable() {
    const { dispatch, form, currentUser } = this.props;
    form.resetFields();
    let payload = {
      pageIndex: this.state.pagination.current,
      pageSize: this.state.pagination.pageSize,
      userId: currentUser.userId,
      // roleName: currentUser.roleName
    };
    dispatch({
      type: 'stocktakingCase/fetch',
      payload,
    });
  }

  handleAudit = caseInfo => {
    let payload = {
      caseId: caseInfo.caseId,
      modifier: this.props.currentUser.userId,
    };
    dispatch({
      type: 'stocktakingCase/changeState',
      payload,
    });
  };

  handleAdd = (fields, form) => {
    const { currentUser = {} } = this.props;
    let subFields = Object.assign({}, fields);
    subFields.planBeginTime = subFields.planBeginTime.format('YYYY/MM/DD HH:mm:ss');
    subFields.planEndTime = subFields.planEndTime.format('YYYY/MM/DD HH:mm:ss');
    subFields.creater = currentUser.userId;
    subFields.modifier = currentUser.userId;

    this.props
      .dispatch({
        type: 'stocktakingCase/add',
        payload: subFields,
      })
      .then(
        success => {
          if (success) {
            message.success('添加成功');
            this.setState({
              modalVisible: false,
            });
            form.resetFields();
            this.refreshTable.bind(this)();
          } else {
            message.error('操作失败，请稍后再试');
          }
        },
        () => {
          message.error('操作失败，请稍后再试');
        }
      );
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={10} sm={24}>
            <FormItem label="计划开始时间">
              {getFieldDecorator('planBeginTimeRange')(
                <RangePicker format={'YYYY/MM/DD'} placeholder={['开始时间', '结束时间']} />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="设备状态">
              {getFieldDecorator('caseState')(
                <Select placeholder={`请选择设备状态`}>
                  <Option key={-1} value={''}>
                    全部
                  </Option>
                  {Object.keys(statusMap).map(op => (
                    <Option key={op} value={op}>
                      {statusMap[op]}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
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

  render() {
    const { stocktakingCase, loading } = this.props;
    const { selectedRows, modalVisible } = this.state;
    let list = [];
    stocktakingCase.list.forEach(id => {
      list.push(stocktakingCase.byIds[id]);
    });
    let data = {
      list,
      pagination: stocktakingCase.pagination,
    };

    const columns = [
      {
        title: '工单ID',
        dataIndex: 'caseId',
      },
      {
        title: '科室',
        dataIndex: 'deptName',
      },
      {
        title: '计划开始时间',
        dataIndex: 'planBeginTime',
        // sorter: true,
        render: val => <span>{val ? moment(val).format('YYYY-MM-DD') : '--'}</span>,
      },

      {
        title: '实际盘点时间',
        dataIndex: 'actualTime',
        // sorter: true,
        render: val => <span>{val ? moment(val).format('YYYY-MM-DD') : '--'}</span>,
      },
      {
        title: '工单状态',
        dataIndex: 'caseState',
        render(val) {
          return <Badge status={val} text={statusMap[val]} />;
        },
      },
      {
        title: '盘点人',
        dataIndex: 'assigneeUserName',
      },
      {
        title: '操作',
        render: val => (
          <Fragment>
            {val.auditState != 1 && (
              <a
                onClick={() => {
                  this.handleAudit(val);
                }}
              >
                审核
              </a>
            )}
            <Link to={'/asset/asset-case/' + val.caseId}>详情</Link>
          </Fragment>
        ),
      },
    ];

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
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
              {false &&
                selectedRows.length > 0 && (
                  <span>
                    <Button>批量操作</Button>
                    <Dropdown overlay={menu}>
                      <Button>
                        更多操作 <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </span>
                )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              rowKey={'caseId'}
              columns={columns}
              pagination={this.state.pagination}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderLayout>
    );
  }
}
