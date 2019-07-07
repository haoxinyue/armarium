import React, { Component } from 'react';
import { connect } from 'dva';
import { Select, Spin } from 'antd';
import Debounce from 'lodash-decorators/debounce';

const { Option } = Select;
@connect(({ role = {}, loading }) => ({
  role,
  loading: loading.models['role/fetchSelectList'],
}))
class RoleSelect extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    dispatch({
      type: 'role/fetchSelectList',
      payload: {
        pageSize: 999,
      },
    });
  }

  componentDidMount() {}

  @Debounce(600)
  fetchDeviceList(value) {
    const { dispatch } = this.props;
    dispatch({
      type: 'role/fetchSelectList',
      payload: {
        pageSize: 999,
      },
    });
  }

  render() {
    const { value, role, onChange, loading, placeholder } = this.props;
    const { selectData = {} } = role;
    const { list = [], byIds } = selectData;

    // onSearch={this.fetchDeviceList.bind(this)}
    return (
      <Select
        mode="AutoComplete"
        value={value}
        placeholder={placeholder || '请选择'}
        notFoundContent={loading ? <Spin size="small" /> : null}
        filterOption={false}
        onChange={v => {
          onChange(v);
        }}
        style={{ width: '100%' }}
      >
        {list.map(d => (
          <Option key={byIds[d].roleId}>{`${byIds[d].roleName}(${byIds[d].roleId})`}</Option>
        ))}
      </Select>
    );
  }
}

export default RoleSelect;
