import React, { Component } from 'react';
import { connect } from 'dva';
import { TreeSelect, Icon } from 'antd';
const { TreeNode } = TreeSelect;

@connect(({ department, loading }) => ({
  department,
  loading: loading.effects['department/fetchTree'],
}))
class DepartmentSelect extends Component {
  state = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, hospitalId } = this.props;
    let payload = {};
    if (hospitalId) {
      payload.hospitalId = hospitalId;
    }
    dispatch({
      type: 'department/fetch',
      cache: true,
      payload,
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

  // shouldComponentUpdate(nextProps){
  // const { dispatch ,hospitalId} = nextProps;
  // const { hospitalId:lastHospitalId} = this.props;
  //
  // if(hospitalId && hospitalId!=lastHospitalId){
  //   let payload ={};
  //   payload.hospitalId = hospitalId;
  //   dispatch({
  //     type: 'department/fetch',
  //     cache: true,
  //     payload
  //   });
  //   return true
  // }
  //
  // return false;

  // }

  componentWillReceiveProps(nextProps) {
    const { dispatch, hospitalId } = nextProps;
    const { hospitalId: lastHospitalId } = this.props;

    if (hospitalId && hospitalId != lastHospitalId) {
      let payload = {};
      payload.hospitalId = hospitalId;
      dispatch({
        type: 'department/fetch',
        cache: true,
        payload,
      });
    }
  }

  render() {
    const { department: { tree, treeByHospitalIds }, hospitalId } = this.props;
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

    const treeData = hospitalId ? treeByHospitalIds[hospitalId] : tree;

    if (treeData && treeData.length) {
      return (
        <TreeSelect {...defaultProps} {...this.props} style={{ width: '100%' }}>
          {this.renderTreeNodes(treeData)}
        </TreeSelect>
      );
    } else {
      return <Icon type="loading" style={{ fontSize: 16, color: '#08c' }} />;
    }
  }
}

export default DepartmentSelect;
