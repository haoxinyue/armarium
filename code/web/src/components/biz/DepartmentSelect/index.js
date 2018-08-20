import React, { Component } from 'react';
import { connect } from 'dva';
import { TreeSelect, Icon } from 'antd';
const { TreeNode } = TreeSelect;

@connect(({ department, loading }) => ({
  department,
  loading: loading.effects['department/fetchTree'],
}))
class DepartmentSelect extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'department/fetch',
      cache: true,
    });
  }

  renderTreeNodes = data => {
    const { department: { byIds } } = this.props;
    return data.map(dept => {
      let item = byIds[dept.deptId];
      let isLeaf = !dept.children || dept.children.length === 0;
      let title = `${item.deptName}(${item.deptId})`;
      return (
        <TreeNode title={title} value={item.deptId + ''} key={item.deptId} isLeaf={isLeaf}>
          {!isLeaf && this.renderTreeNodes(dept.children)}
        </TreeNode>
      );
    });
  };

  render() {
    const { department: { tree } } = this.props;
    const defaultProps = {
      showSearch: true,
      placeholder: '请选择',
      allowClear: true,
      treeDefaultExpandAll: true,
      filterTreeNode: (inputValue, treeNode) => {
        if (!inputValue) {
          return true;
        }
        return treeNode.props.title.includes(inputValue);
      },
    };
    if (tree && tree.length) {
      return (
        <TreeSelect {...defaultProps} {...this.props} style={{ width: '100%' }}>
          {this.renderTreeNodes(tree)}
        </TreeSelect>
      );
    } else {
      return <Icon type="loading" style={{ fontSize: 16, color: '#08c' }} />;
    }
  }
}

export default DepartmentSelect;
