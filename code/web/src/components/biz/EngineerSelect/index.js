import React, { Component } from 'react';
import { connect } from 'dva';
import { Select, Spin } from 'antd';
import Debounce from 'lodash-decorators/debounce';

const { Option } = Select;
@connect(({ engineer, loading }) => ({
  engineer,
  loading: loading.effects['engineer/fetchTree'],
}))
class EngineerSelect extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    loading: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'engineer/fetch',
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
      engineer: { list, byIds },
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
          <Option key={byIds[d].userId} title={byIds[d].displayName}>
            {byIds[d].displayName}
          </Option>
        ))}
      </Select>
    );
  }
}

export default EngineerSelect;
