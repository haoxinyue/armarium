
import React, {Component} from 'react';
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import {Card, Tree,Form,Button,message,Modal,Input,Select} from 'antd';
import DepartmentSelect from '../../components/biz/DepartmentSelect'
const FormItem = Form.Item;
const {TreeNode} = Tree;
import PageHeaderLayout from '../../layouts/PageHeaderLayout';


const CreateForm = Form.create()(props =>
  {
    const { modalVisible, form, handleAdd, handleModalVisible ,hospital} = props;
    const {getFieldDecorator} = form;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        handleAdd(fieldsValue);
      });
    };

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 7},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
        md: {span: 10},
      },
    };


    function getSelectFieldNode(fieldName, title, isRequired, options) {
      return <FormItem  {...formItemLayout} label={(isRequired ? "*" : "") + title}>
        {getFieldDecorator(fieldName, {
          rules: [
            {
              required: isRequired,
              message: `请选择${title}`,
            },
          ],
        })(
          <Select style={{display:'block'}} placeholder={`请选择${title}`}>
            {
              options.map((op) => <Select.Option key={op.value} value={op.value}>{op.text}</Select.Option>)
            }
          </Select>
        )}
      </FormItem>
    }

    return (<Modal
      title="新建部门"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem {...formItemLayout} label="名称">
        {form.getFieldDecorator('deptName', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem {...formItemLayout} label="管理人">
        {form.getFieldDecorator('deptOwner', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem {...formItemLayout} label="所属部门">
        {form.getFieldDecorator('parentDeptId', {
          rules: [],
        })(<DepartmentSelect style={{width:'100%'}} placeholder="请选择所属部门"/>)}
      </FormItem>

      {getSelectFieldNode("hospitalId", "所属医院", true,hospital.list.map((hid)=>{
        let h = hospital.byIds[hid];
        return {value:h.hospitalId,text:h.hospitalName}
      }))}

    </Modal>)


});

@connect(({department, hospital,loading}) => ({
  department,
  hospital,
  loading: loading.effects['department/fetchTree'],
}))
@Form.create()
export default class DepartmentTree extends Component {

  constructor(p) {
    super(p)

    this.renderTreeNodes = this.renderTreeNodes.bind(this)
  }


  state = {
    modalVisible: false,
    formValues: {},
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'department/fetch'
    });
  }

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = fields => {
    // const setState = this.setState
    const {dispatch} = this.props
    let me = this
    dispatch({
      type: 'department/add',
      payload: {
        ...fields,
        creater:10002,
        modifier:10002
      },
      callback:(res)=>{
        if (res.success){
          message.success('添加成功');
          me.setState({
            modalVisible: false,
          });

          dispatch({
            type: 'department/fetch'
          });

        }else {
          message.success('添加失败');
        }

      }
    }).then((res)=>{

    });


  };

  renderTreeNodes = (data) => {
    const {department:{byIds}} = this.props;
    return data.map((dept) => {
      let item = byIds[dept.deptId];
      let isLeaf = !dept.children || dept.children.length ===0;
        return (
          <TreeNode title={item.deptName} key={item.deptId} isLeaf={isLeaf}>
            {dept.children && dept.children.length&&this.renderTreeNodes(dept.children)}
          </TreeNode>
        );

    });
  }

  render() {

    const {department:{tree},hospital, loading} = this.props;
    const {  modalVisible } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout title="部门树">
          <div>
            <Button icon="plus" style={{marginBottom:10}} type="primary" onClick={() => this.handleModalVisible(true)}>
              新建
            </Button>
          </div>
        <Card bordered={false} style={{position:"relative"}}>

          <Tree
            showLine
          >
            {this.renderTreeNodes(tree)}
          </Tree>

        </Card>

        <CreateForm {...parentMethods} hospital={hospital} modalVisible={modalVisible} />
      </PageHeaderLayout>
    );
  }
}
