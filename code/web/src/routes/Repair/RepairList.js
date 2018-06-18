import React, {PureComponent, Fragment} from 'react';
import moment from 'moment';
import {connect} from 'dva';
import {Link, routerRedux} from 'dva/router';
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
  Badge
} from 'antd';

import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './TableList.less';
import DeviceSelect from "../../components/biz/DeviceSelect";

const {TextArea} = Input;

const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const CreateForm = Form.create()(props => {
  const {modalVisible, form, handleAdd, handleModalVisible} = props;
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
      <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="报修设备">
        {form.getFieldDecorator('deviceId', {
          rules: [{required: true, message: '请选择报修设备...'}],
        })(
          <DeviceSelect placeholder="请选择报修设备"/>
        )}
      </FormItem>
      <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="报修描述">
        {form.getFieldDecorator('caseRemark', {
          rules: [{required: true, message: '请输入设备Id...'}],
        })(<TextArea style={{minHeight: 32}} placeholder="请输入描述信息" rows={4}/>)}
      </FormItem>

    </Modal>
  );
});

@connect(({repair, loading, user}) => ({
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
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'repair/fetch',
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
      type: 'repair/fetch',
      payload: {
        ...params
      },
    });
  };

  handleFormReset = () => {
    const {form, dispatch} = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'repair/fetch',
      payload: {},
    });
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
        ...fieldsValue
      };

      this.setState({
        formValues: values,
      });

      let payload = {}

      for (let k in values) {
        if (values[k] !== undefined) {
          payload[k] = values[k]
        }
      }

      dispatch({
        type: 'repair/fetch',
        payload
      });
    });
  };

  handleModalVisible = flag => {
    const {dispatch} = this.props
    // dispatch(routerRedux.push('/repair/repair-add'))
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = fields => {
    const {user = {}, dispatch} = this.props;
    const currentUserId = user.currentUser.userId

    dispatch({
      type: 'repair/add',
      payload: {
        ...fields,
        reporterUserId: currentUserId,
        creater: currentUserId,
        modifier: currentUserId
      },
      callback: (success) => {
        if (success) {
          message.success('报修成功');
          this.setState({
            modalVisible: false,
          });

          dispatch({
            type: 'repair/fetch',
          });
        } else {
          message.success('报修失败，请稍后再试');
        }
      }
    });


  };

  renderSimpleForm() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={8} sm={24}>
            <FormItem label="设备ID">
              {getFieldDecorator('deviceId')(<Input placeholder="请输入"/>)}
              {/*{getFieldDecorator('deviceId')(<DeviceSelect placeholder="请输入" />)}*/}
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

  changeCaseState(caseInfo,toState){

    const {dispatch,user} = this.props;

    dispatch({
      type:"repair/changeState",
      payload:{
        reporterUserId:user.currentUser.userId,
        caseState:toState,
        caseId:caseInfo.caseId,
        modifier:user.currentUser.userId
      },
      callback:(success)=>{
        if(success){
          message.success('操作成功');
          dispatch({
            type: "repair/fetch",
          })
        }else{
          message.error('操作失败');
        }
      }
    })

  }


  getCaseStateName(state){
    const Names ={
      10:"新报修",
      20:"已取消",
      30:"维修中",
      40:"已完成",
      50:"已关闭"
    };

    return Names[state]||"未知"

  }

  getOperation(caseInfo, role) {
    let ops = [];
    ops.push(<Link to={"/repair/repair-detail/" + caseInfo.caseId} title="进入详情">详情</Link>);
    if (caseInfo && role && caseInfo.caseState) {
      switch (caseInfo.caseState) {
        case 10:
          if (role === "调度") {
            ops.push(<span>&nbsp;</span>)
            ops.push(<a onClick={this.changeCaseState.bind(this,caseInfo,20)} title="取消工单">取消</a>);
            ops.push(<span>&nbsp;</span>)
            ops.push(<a onClick={this.changeCaseState.bind(this,caseInfo,30)} title="分配给工程师">分配</a>);
          }
          break;
        case 20:
          break;
        case 30:
          if (role === "驻场工程师") {
            ops.push(<span>&nbsp;</span>)
            ops.push(<a onClick={this.changeCaseState.bind(this,caseInfo,40)} title="完成维修">完成</a>);
          }
          break;
        case 40:
          if (role === "主管") {
            ops.push(<span>&nbsp;</span>)
            ops.push(<a onClick={this.changeCaseState.bind(this,caseInfo,50)} title="关闭">关闭</a>);
          }
          break;
        case 50:
          break;
      }
    }


    return ops

  }

  render() {
    const {repair, loading, user} = this.props;
    const {selectedRows, modalVisible} = this.state;
    const roleName = user.currentUser.roleName;
    let list = [];
    repair.list.forEach((id) => {
      list.push(repair.byIds[id])
    });
    let data = {
      list,
      pagination: repair.pagination
    };

    const columns = [
      {
        title: '工单ID',
        dataIndex: 'caseId',
      }, {
        title: '设备ID',
        dataIndex: 'deviceId',
      }, {
        title: '报修描述',
        dataIndex: 'caseRemark',
      },
      {
        title: '所属医院',
        dataIndex: 'hospital',
      },
      {
        title: '状态',
        dataIndex: 'caseState',
        render:val=>this.getCaseStateName.bind(this)(val)
      }, {
        title: '报修时间',
        dataIndex: 'createTime',
        // sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        render: (val) => (

          <Fragment>
            {this.getOperation.bind(this)(val, roleName)}
          </Fragment>
        ),
      },
    ];


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
              rowKey={"caseId"}
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
