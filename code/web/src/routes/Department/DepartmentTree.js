
import React, {Component} from 'react';
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import {Card, Tree} from 'antd';
const {TreeNode} = Tree;
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(({department, loading}) => ({
  department,
  loading: loading.effects['department/fetchTree'],
}))
export default class DepartmentTree extends Component {

  constructor(p) {
    super(p)

    this.renderTreeNodes = this.renderTreeNodes.bind(this)
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'department/fetch'
    });
  }



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

    const {department:{tree}, loading} = this.props;


    return (
      <PageHeaderLayout title="部门树">

        <Card bordered={false} style={{position:"relative"}}>

          <Tree
            showLine
          >
            {this.renderTreeNodes(tree)}
          </Tree>

        </Card>
      </PageHeaderLayout>
    );
  }
}
