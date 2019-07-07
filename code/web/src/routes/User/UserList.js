import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
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
import RoleSelect from '../../components/biz/RoleSelect';
import DepartmentSelect from '../../components/biz/DepartmentSelect';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible, user = {} } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="添加用户"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="登录名">
        {form.getFieldDecorator('LoginName', {
          initialValue: user.LoginName,
          rules: [{ required: true, message: '请输入登录名...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="显示名称">
        {form.getFieldDecorator('DisplayName', {
          initialValue: user.DisplayName,
          rules: [{ required: true, message: '请输入显示名称...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
        {form.getFieldDecorator('LoginPassword', {
          initialValue: user.LoginPassword,
          rules: [{ required: true, message: '请输入密码...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="手机号">
        {form.getFieldDecorator('Mobile', {
          initialValue: user.Mobile,
          rules: [{ required: true, message: '请输入手机号...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="电子邮箱">
        {form.getFieldDecorator('Email', {
          initialValue: user.Email,
          rules: [{ required: true, message: '请输入电子邮箱...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="角色">
        {form.getFieldDecorator('roleId', {
          initialValue: user.roleId,
          rules: [{ required: true, message: '请选择角色...' }],
        })(<RoleSelect placeholder="请选择角色" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="所属部门">
        {form.getFieldDecorator('deptId', {
          initialValue: user.deptId,
          rules: [{ required: true, message: '请选择所属部门...' }],
        })(<DepartmentSelect placeholder="请选择所属部门" />)}
      </FormItem>
    </Modal>
  );
});

@connect(({ userlist, loading }) => ({
  userlist,
  loading: loading.models.userlist,
}))
@Form.create()
export default class UserList extends PureComponent {
  state = {
    modalMode: 'add',
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    modalUser: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userlist/fetch',
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
      type: 'userlist/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'userlist/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'userlist/remove',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
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

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'userlist/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = (flag, user) => {
    this.setState({
      modalMode: user ? 'edit' : 'add',
      modalVisible: !!flag,
      modalUser: user,
    });
  };

  handleAdd = fields => {
    const { modalMode, modalUser } = this.state;

    this.props.dispatch({
      type: modalMode === 'edit' ? 'userlist/edit' : 'userlist/add',
      payload: {
        ...(modalUser || {}),
        ...fields,
      },
    });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="用户名称">
              {getFieldDecorator('DisplayName')(<Input placeholder="请输入" />)}
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

  render() {
    const { userlist: { data }, loading } = this.props;
    const { selectedRows, modalVisible, modalUser } = this.state;

    const columns = [
      {
        title: '登录名',
        dataIndex: 'LoginName',
      },
      {
        title: '显示名',
        dataIndex: 'DisplayName',
      },
      {
        title: '手机号',
        dataIndex: 'Mobile',
      },
      {
        title: '角色',
        dataIndex: 'role',
      },
      {
        title: '电子邮箱',
        dataIndex: 'Email',
      },
      {
        title: '操作',
        render: val => (
          <Fragment>
            <a
              onClick={() => {
                this.handleModalVisible(true, val);
              }}
            >
              详情
            </a>
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
              {selectedRows.length > 0 && (
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
              rowKey={'UserId'}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} user={modalUser} modalVisible={modalVisible} />
      </PageHeaderLayout>
    );
  }
}
