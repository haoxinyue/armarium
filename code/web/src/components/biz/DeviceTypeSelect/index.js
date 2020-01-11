import React, { Component } from 'react';
import { connect } from 'dva';
import { Select, Spin } from 'antd';
import Debounce from 'lodash-decorators/debounce';

const { Option } = Select;
@connect(({ device, loading }) => ({
  device,
  loading: loading.effects['device/fetchTypeList'],
}))
class DeviceTypeSelect extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'device/fetchTypeList',
      payload: {
        pageSize: 100,
      },
    });
  }

  @Debounce(600)
  fetchDeviceList(value) {
    const { dispatch } = this.props;
    dispatch({
      type: 'device/fetchTypeList',
      payload: {
        pageSize: 100,
        // deviceName: value,
      },
    });
  }

  render() {
    const { value, device: { typeData }, onChange, loading, placeholder } = this.props;
    const { list, byIds } = typeData;

    console.log('typeData', typeData);

    return (
      <Select
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
          <Option key={byIds[d].deviceTypeId}>{`${byIds[d].deviceTypeName}(${
            byIds[d].deviceTypeId
          })`}</Option>
        ))}
      </Select>
    );
  }
}

export default DeviceTypeSelect;
