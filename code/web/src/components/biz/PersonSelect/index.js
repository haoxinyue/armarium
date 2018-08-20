import React, { Component } from 'react';
import { connect } from 'dva';
import { Select, Spin } from 'antd';
import Debounce from 'lodash-decorators/debounce';

const { Option } = Select;

class PersonSelect extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    loading: false,
  };

  componentDidMount() {}

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
    const { value, list = [], onSearch, onChange, placeholder } = this.props;

    const { loading } = this.state;

    return (
      <Select
        mode="combobox"
        value={value}
        placeholder={placeholder || '请选择'}
        notFoundContent={loading ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={v => {
          onSearch(v);
        }}
        onChange={onChange}
        style={{ width: '100%' }}
      >
        {list.map(d => <Option key={d.id}>{d.text}</Option>)}
      </Select>
    );
  }
}

export default PersonSelect;
