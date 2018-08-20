import React, { Component } from 'react';
import { connect } from 'dva';
import { Select, Spin } from 'antd';
import Debounce from 'lodash-decorators/debounce';

const { Option } = Select;
@connect(({ hospital, loading }) => ({
  hospital,
  loading: loading.effects['hospital/fetch'],
}))
class HospitalSelect extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    loading: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'hospital/fetch',
      payload: {},
    });
  }

  @Debounce(600)
  onMySearch(value) {
    const { onSearch } = this.props;

    if (onSearch) {
      this.setState({
        loading: true,
      });

      let dtd = onSearch(value);
      if (dtd && dtd.finally) {
        dtd.finally(() => {
          this.setState({
            loading: false,
          });
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    }
  }

  render() {
    const {
      value,
      onSearch,
      onChange = () => {},
      placeholder,
      hospital: { list, byIds },
      loading,
    } = this.props;

    return (
      <Select
        mode="combobox"
        value={value}
        optionLabelProp={'title'}
        placeholder={placeholder || '请选择'}
        notFoundContent={loading ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={v => {
          onSearch && onSearch(v);
        }}
        onChange={onChange}
        style={{ width: '100%' }}
      >
        {list.map(d => (
          <Option key={byIds[d].hospitalId} title={byIds[d].hospitalName}>
            {byIds[d].hospitalName}
            {`(${byIds[d].hospitalId})`}
          </Option>
        ))}
      </Select>
    );
  }
}

export default HospitalSelect;
