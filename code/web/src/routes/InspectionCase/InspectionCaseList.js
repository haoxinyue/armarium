import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {routerRedux} from 'dva/router';
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
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DepartmentSelect from '../../components/biz/DepartmentSelect';
import HospitalSelect from '../../components/biz/HospitalSelect';
import moment from 'moment';

import styles from './TableList.less';
import EngineerSelect from '../../components/biz/EngineerSelect';

const FormItem = Form.Item;
const {Option} = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = {'10': '待巡检', '20': '已取消', '30': '巡检中', '50': '已关闭'};


const CreateForm = Form.create()(props => {
  const {modalVisible, form, handleAdd, handleModalVisible} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleAdd(fieldsValue, form);
    });
  };
  return (
    <Modal
      title="新建工单"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="设备名称">
        {form.getFieldDecorator('deviceName', {
          rules: [{required: true, message: '请输入设备名称...'}],
        })(<Input placeholder="请输入"/>)}
      </FormItem>

      <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="所属医院">
        {form.getFieldDecorator('hospitalId', {
          rules: [{required: true, message: '请选择医院...'}],
        })(<HospitalSelect placeholder="请选择医院"/>)}
      </FormItem>

      <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="所属部门">
        {form.getFieldDecorator('deptId', {
          rules: [{required: true, message: '请选择所属部门...'}],
        })(<DepartmentSelect placeholder="请选择所属部门"/>)}
      </FormItem>
      <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="指派给">
        {form.getFieldDecorator('assigneeUserId', {
          rules: [{required: true, message: '请选择工程师...'}],
        })(<EngineerSelect placeholder="请选择工程师"/>)}
      </FormItem>

      {/*<FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="设备类型">
        {form.getFieldDecorator('deviceType', {
          rules: [{ required: true, message: '请输入设备类型...' }],
        })(<Input placeholder="请输入设备类型" />)}
      </FormItem>*/}

      <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="是否需要巡检">
        {form.getFieldDecorator('needInspection', {
          initialValue: false,
          rules: [{required: true}],
        })(<Checkbox style={{marginLeft: 8}}/>)}
      </FormItem>

      <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="是否需要计量">
        {form.getFieldDecorator('needMetering', {
          initialValue: false,
          rules: [{required: true}],
        })(<Checkbox style={{marginLeft: 8}}/>)}
      </FormItem>

      <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="设备类型">
        {form.getFieldDecorator('deviceType', {
          rules: [{required: true, message: '请设置设备类型...'}],
        })(
          <Select placeholder="请选择" initialValue="1" style={{width: '100%'}}>
            <Option value="1">B超</Option>
            <Option value="2">眼检仪</Option>
            <Option value="0">其他</Option>
          </Select>
        )}
      </FormItem>

      <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="期望安装时间">
        {form.getFieldDecorator('expectedTime', {
          rules: [{required: true, message: '请选择时间...'}],
        })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="请选择时间"/>)}
      </FormItem>

      <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="型号">
        {form.getFieldDecorator('deviceModel', {
          rules: [{required: true, message: '请输入设备型号...'}],
        })(<Input placeholder="请输入"/>)}
      </FormItem>

      <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="序列号">
        {form.getFieldDecorator('serialNumber', {
          rules: [{required: true, message: '请输入序列号...'}],
        })(<Input placeholder="请输入序列号"/>)}
      </FormItem>
    </Modal>
  );
});

@connect(({inspectionCase, user, loading}) => ({
  inspectionCase,
  currentUser: user.currentUser || {},
  loading: loading.models['inspectionCase/fetch'],
}))
@Form.create()
export default class InspectionCaseList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'inspectionCase/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const {dispatch} = this.props;
    const {formValues} = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = {...obj};
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'inspectionCase/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const {form, dispatch} = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'inspectionCase/fetch',
      payload: {},
    });
  };

  closeCase(mCase) {
    const {dispatch} = this.props;
    Modal.confirm({
      title: `确认`,
      content: `确认关闭工单 【${mCase.deviceName}(${mCase.caseId})】?`,
      okText: '确认',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'inspectionCase/close',
          payload: {
            caseId: mCase.caseId
          },
        }).then(res => {
          message.success('关闭成功');
          dispatch({
            type: 'inspectionCase/fetchDetail',
            payload: {
              caseId: mCase.caseId
            },
          });
        });
      },
      onCancel() {
      },
    });
  }

  completeCase(mCase) {
    const {dispatch} = this.props;
    Modal.confirm({
      title: `确认`,
      content: `确认完成 【${mCase.deviceName}(${mCase.caseId})】?`,
      okText: '确认',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'inspectionCase/close',
          payload: mCase,
        }).then(
          res => {
            message.success('操作成功');
            dispatch({
              type: 'inspectionCase/fetchDetail',
              payload: mCase,
            });
          },
          () => {
            message.info('操作失败，请稍后再试');
          }
        );
      },
      onCancel() {
      },
    });
  }

  handleMenuClick = e => {
    const {dispatch} = this.props;
    const {selectedRows} = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'device/remove',
          payload: {
            deviceId: selectedRows.map(row => row.deviceId).join(','),
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

    const {dispatch, form} = this.props;

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
        type: 'inspectionCase/fetch',
        payload,
      });
    });
  };

  handleModalVisible = flag => {
    // const {dispatch} = this.props
    // dispatch(routerRedux.push('/device/device-add'))
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = (fields, form) => {
    const {currentUser = {}} = this.props;
    let subFields = Object.assign({}, fields);
    subFields.expectedTime = subFields.expectedTime.format('YYYY/MM/DD HH:mm:ss');
    subFields.creater = currentUser.userId;
    subFields.modifier = currentUser.userId;

    this.props
      .dispatch({
        type: 'inspectionCase/add',
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
            this.props.dispatch({
              type: 'inspectionCase/fetch',
            });
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
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={8} sm={24}>
            <FormItem label="设备编号">
              {getFieldDecorator('deviceCode')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="设备名称">
              {getFieldDecorator('deviceName')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>
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
    const {inspectionCase, loading} = this.props;
    const {selectedRows, modalVisible} = this.state;
    let list = [];
    inspectionCase.list.forEach(id => {
      list.push(inspectionCase.byIds[id]);
    });
    let data = {
      list,
      pagination: inspectionCase.pagination,
    };

    const columns = [
      {
        title: '工单ID',
        dataIndex: 'caseId',
      },
      {
        title: '设备名称',
        dataIndex: 'deviceName',
      },
      // {
      //   title: '工单状态',
      //   dataIndex: 'caseState',
      //   filters: [
      //     {
      //       text: statusMap['10'],
      //       value: 10,
      //     },
      //     {
      //       text: statusMap['20'],
      //       value: 20,
      //     },
      //     {
      //       text: statusMap['30'],
      //       value: 30,
      //     },
      //     {
      //       text: statusMap['50'],
      //       value: 50,
      //     },
      //   ],
      //   onFilter: (value, record) => record.caseState == value,
      //   render(val) {
      //     return <Badge status={val} text={statusMap[val]}/>;
      //   },
      // },
      {
        title: '巡检人员',
        dataIndex: 'assigneeUserName',
      },
      {
        title: '巡检类型',
        dataIndex: 'inspectionType',
        filters: [
          {
            text: "巡检",
            value: 1,
          },
          {
            text: "强检",
            value: 2,
          }
        ],
        render :(val)=><span>{val===2?"强检":"巡检"}</span>
      },
      {
        title: '巡检描述',
        dataIndex: 'inspectionRemark',
        render :(val)=><span style={{width:'100%',display:"inline-block",textOverflow:"hidden"}} title={val}>{val}</span>
      },

      {
        title: '巡检时间',
        dataIndex: 'inspectionTime',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      }/*,
      {
        title: '操作',
        render: val => (
          <Fragment>
            <Link to={'/install-case/case-edit/' + val.caseId}>详情</Link>
            &nbsp;
            <a onClick={this.closeCase.bind(this, val)}>关闭</a>
          </Fragment>
        ),
      },*/
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
              {/*<Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>*/}
              {false &&
              selectedRows.length > 0 && (
                <span>
                    <Button>批量操作</Button>
                    <Dropdown overlay={menu}>
                      <Button>
                        更多操作 <Icon type="down"/>
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
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible}/>
      </PageHeaderLayout>
    );
  }
}
