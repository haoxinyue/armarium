import React, { Component } from 'react';
import { connect } from 'dva';
import { Select, Spin } from 'antd';
import Debounce from 'lodash-decorators/debounce';

const { Option } = Select;
@connect(({ device, loading }) => ({
  device,
  loading: loading.effects['device/fetchSelectList'],
}))
class DeviceSelect extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'device/fetchSelectList',
      payload: {
        pageSize: 10,
      },
    });
  }

  @Debounce(600)
  fetchDeviceList(value) {
    const { dispatch } = this.props;
    dispatch({
      type: 'device/fetchSelectList',
      payload: {
        pageSize: 10,
        deviceName: value,
      },
    });
  }

  render() {
    const { value, device: { selectData }, onChange, loading, placeholder } = this.props;
    const { list, byIds } = selectData;

    return (
      <Select
        mode="combobox"
        value={value}
        placeholder={placeholder || '请选择'}
        notFoundContent={loading ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchDeviceList.bind(this)}
        onChange={v => {
          onChange(v);
        }}
        style={{ width: '100%' }}
      >
        {list.map(d => (
          <Option key={byIds[d].deviceId}>{`${byIds[d].deviceName}(${byIds[d].deviceId})`}</Option>
        ))}
      </Select>
    );
  }
}

export default DeviceSelect;
