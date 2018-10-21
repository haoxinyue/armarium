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
  message,
  Badge,
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './TableList.less';

import { UsageStateNames, DeviceStateNames } from '../../utils/constants';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="添加设备"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="设备编号">
        {form.getFieldDecorator('deviceCode', {
          rules: [{ required: true, message: '请输入设备编号...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="名称">
        {form.getFieldDecorator('deviceName', {
          rules: [{ required: true, message: '请输入设备名称...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="编号">
        {form.getFieldDecorator('AssetNo', {
          rules: [{ required: true, message: '请输入资产编号...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="型号">
        {form.getFieldDecorator('deviceModel', {
          rules: [{ required: true, message: '请输入设备型号...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
        {form.getFieldDecorator('deviceDesc', {
          rules: [{ required: true, message: '请输入设备描述...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="序列号">
        {form.getFieldDecorator('SerialNumber', {
          rules: [{ required: true, message: '请输入设备序列号...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="二维码号">
        {form.getFieldDecorator('QRCode', {
          rules: [{ required: true, message: '请输入设备二维码号...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="厂商">
        {form.getFieldDecorator('Manufacturer', {
          rules: [{ required: true, message: '请输入设备厂商...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="产地">
        {form.getFieldDecorator('ProducingPlace', {
          rules: [{ required: true, message: '请输入设备产地...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="设备状态">
        {form.getFieldDecorator('deviceState', {
          rules: [{ required: true, message: '请输入设置状态...' }],
        })(
          <Select placeholder="请选择" initialValue="1">
            <Option value="1">正常</Option>
            <Option value="2">故障</Option>
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="使用状态">
        {form.getFieldDecorator('usageState', {
          rules: [{ required: true, message: '请输入设置状态...' }],
        })(
          <Select placeholder="请选择" initialValue="1">
            <Option value="1">使用</Option>
            <Option value="0">停用</Option>
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="设备类型">
        {form.getFieldDecorator('deviceType', {
          rules: [{ required: true, message: '请输入设置状态...' }],
        })(
          <Select placeholder="请选择" initialValue="1">
            <Option value="1">B超</Option>
            <Option value="2">眼检仪</Option>
            <Option value="0">其他</Option>
          </Select>
        )}
      </FormItem>
    </Modal>
  );
});

@connect(({ device, loading }) => ({
  device,
  loading: loading.models.device,
}))
@Form.create()
export default class DeviceList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'device/fetch',
      payload: {
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
      type: 'device/fetch',
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
      type: 'device/fetch',
      payload: {
        pageIndex: 0,
        pageSize: 10,
      },
    });
  };

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  };

  deleteDevice(device) {
    const { dispatch, device: deviceState } = this.props;
    Modal.confirm({
      title: `确认`,
      content: `确认删除 【${device.deviceName}(${device.deviceId})】?`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'device/remove',
          payload: device,
        }).then(res => {
          if (res.success) {
            message.success('删除成功');
            this.handleSearch();
          } else {
            message.error('删除失败');
          }
        });
      },
      onCancel: () => {},
    });
  }

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'device/remove',
          payload: {
            deviceId: selectedRows.map(row => row.deviceId).join(','),
          },
        }).then(res => {
          if (res.success) {
            message.success('删除成功');
            this.handleSearch();
            this.setState({
              selectedRows: [],
            });
          } else {
            message.error('删除失败');
          }
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
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const { dispatch, form, device } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      let payload = {
        pageIndex: device.pagination.current - 1,
        pageSize: device.pagination.pageSize,
      };

      for (let k in values) {
        if (values[k] !== undefined) {
          payload[k] = values[k];
        }
      }

      dispatch({
        type: 'device/fetch',
        payload,
      });
    });
  };

  handleModalVisible = flag => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/device/device-add'));
    // this.setState({
    //   modalVisible: !!flag,
    // });
  };

  handleAdd = fields => {
    this.props.dispatch({
      type: 'device/add',
      payload: {
        description: fields.desc,
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
    const { device, loading } = this.props;
    const { selectedRows, modalVisible } = this.state;
    let list = [];
    device.list.forEach(id => {
      list.push(device.byIds[id]);
    });
    let data = {
      list,
      pagination: device.pagination,
    };

    const columns = [
      {
        title: '设备ID',
        dataIndex: 'deviceId',
      },
      {
        title: '设备编号',
        dataIndex: 'deviceCode',
      },
      {
        title: '设备名称',
        dataIndex: 'deviceName',
      },
      {
        title: '设备状态',
        dataIndex: 'deviceState',
        filters: Object.keys(DeviceStateNames).map(d => ({
          text: DeviceStateNames[d],
          value: d,
        })),
        onFilter: (value, record) => record.deviceState == value,
        render(val) {
          return <span title={DeviceStateNames[val]}>{DeviceStateNames[val]}</span>;
        },
      },
      {
        title: '使用状态',
        dataIndex: 'usageState',
        filters: Object.keys(UsageStateNames).map(d => ({
          text: UsageStateNames[d],
          value: d,
        })),
        onFilter: (value, record) => record.usageState.toString() === value,
        render(val) {
          return <span title={UsageStateNames[val]}>{UsageStateNames[val]}</span>;
        },
      },
      // {
      //   title: '更新时间',
      //   dataIndex: 'updatedAt',
      //   sorter: true,
      //   render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      // },
      {
        title: '操作',
        render: val => (
          <Fragment>
            <Link to={'/device/device-detail/' + val.deviceId}>详情</Link>
            &nbsp;
            <a onClick={this.deleteDevice.bind(this, val)}>删除</a>
            {/*<a href="`/device/detail?id=${val.id}`" >详情</a>*/}
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
              rowKey={'deviceId'}
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
