import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { routerRedux } from 'dva/router';
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
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './TableList.less';
import DeviceSelect from '../../components/biz/DeviceSelect';

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
      handleAdd(fieldsValue, form);
    });
  };

  return (
    <Modal
      title="新增不良事件"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="设备Id">
        {form.getFieldDecorator('deviceId', {
          rules: [{ required: true, message: '请选择设备...' }],
        })(<DeviceSelect placeholder="请选择设备" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="事件主题">
        {form.getFieldDecorator('eventSubject', {
          rules: [{ required: true, message: '请输入事件主题...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="事件关联人">
        {form.getFieldDecorator('eventPerson', {
          rules: [{ required: true, message: '请输入事件关联人...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="事件描述">
        {form.getFieldDecorator('eventRemark', {
          rules: [{ required: true, message: '请输入事件描述...' }],
        })(<TextArea placeholder="请输入事件描述" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="事件时间">
        {form.getFieldDecorator('eventTime', {
          initialValue: moment(),
          rules: [{ required: true, message: '请设置事件时间...' }],
        })(<DatePicker format={'YYYY/MM/DD HH:mm:ss'} placeholder="请选择" />)}
      </FormItem>
    </Modal>
  );
});

@connect(({ badEvent, loading, user = {} }) => ({
  badEvent,
  currentUser: user.currentUser,
  loading: loading.models['badEvent/fetch'],
}))
@Form.create()
export default class BadEventList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'badEvent/fetch',
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
      type: 'badEvent/fetch',
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
      type: 'badEvent/fetch',
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

      let payload = {};

      for (let k in values) {
        if (values[k] !== undefined) {
          payload[k] = values[k];
        }
      }

      dispatch({
        type: 'badEvent/fetch',
        payload,
      });
    });
  };

  handleModalVisible = flag => {
    const { dispatch } = this.props;
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = (fields, form) => {
    const { currentUser } = this.props;

    let payload = Object.assign({}, fields);
    payload.eventTime = payload.eventTime.format('YYYY/MM/DD HH:mm:ss');
    payload.creater = currentUser.userId;
    payload.modifier = currentUser.userId;
    //todo
    this.props
      .dispatch({
        type: 'badEvent/add',
        payload,
      })
      .then(res => {
        if (res.success) {
          message.success('添加成功');
          form.resetFields();
          this.setState({
            modalVisible: false,
          });
          this.props.dispatch({
            type: 'badEvent/fetch',
          });
        } else {
          message.error('添加失败');
        }
      });
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="设备编号">
              {getFieldDecorator('deviceCode')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="设备名称">
              {getFieldDecorator('deviceName')(<Input placeholder="请输入" />)}
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

  render() {
    const { badEvent, loading } = this.props;
    const { selectedRows, modalVisible } = this.state;
    let list = [];
    badEvent.list.forEach(id => {
      list.push(badEvent.byIds[id]);
    });
    let data = {
      list,
      pagination: badEvent.pagination,
    };

    const columns = [
      {
        title: '事件ID',
        dataIndex: 'eventId',
      },

      {
        title: '事件主题',
        dataIndex: 'eventSubject',
      },
      {
        title: '事件描述',
        dataIndex: 'eventRemark',
      },
      {
        title: '设备名称',
        dataIndex: 'deviceName',
      },
      {
        title: '时间',
        dataIndex: 'eventTime',
        render(val) {
          return val && moment(val).format('YYYY-MM-DD HH:mm:ss');
        },
      },
      /*{
        title: '所属部门',
        dataIndex: 'deptName'

      },*/

      {
        title: '操作',
        render: val => (
          <Fragment>
            {/*<Link to={'/badEvent/badevent-detail/' + val.eventId}>详情</Link>*/}
            {/*&nbsp;*/}
            <Link to={'/bad-event/event-edit/' + val.eventId}>编辑</Link>
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
            {/*<div className={styles.tableListForm}>{this.renderForm()}</div>*/}
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
              rowKey={'eventId'}
              columns={columns}
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
