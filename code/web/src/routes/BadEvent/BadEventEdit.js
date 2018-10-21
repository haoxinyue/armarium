import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';

import { uploadUrl } from '../../services/api';

import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
  Upload,
  Modal,
  message,
  Checkbox,
  List,
} from 'antd';
import { Link } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../Forms/style.less';
import DeviceSelect from '../../components/biz/DeviceSelect';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

@connect(({ badEvent, hospital, user, loading }) => ({
  badEvent,
  hospital,
  currentUser: user.currentUser || {},
}))
@Form.create()
export default class BadEventEdit extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, match: { params }, currentUser = {} } = this.props;
    let isEditMode = params.eventId != null;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let fData = {
          ...values,
          eventTime: moment(values.eventTime).format('YYYY/MM/DD'),
          creater: currentUser.userId,
          modifier: currentUser.userId,
        };

        if (!isEditMode) {
          delete fData['eventId'];
        }

        dispatch({
          type: isEditMode ? 'badEvent/updateDetail' : 'badEvent/add',
          payload: fData,
        }).then(v => {
          if (v.success) {
            message.success('保存成功');
            dispatch({
              type: 'badEvent/fetchDetail',
              payload: {
                eventId: fData.eventId,
              },
            });
            // dispatch(routerRedux.push(`/device/device-detail/${v.deviceId}`));
          } else {
            message.error('保存失败');
          }
        });
      }
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { dispatch, match: { params: { eventId } } } = this.props;
    const { match: { params: { eventId: NextEventId } } } = nextProps;
    if (NextEventId && NextEventId !== eventId) {
      dispatch({
        type: 'badEvent/fetchDetail',
        payload: { eventId: NextEventId },
      });
      return true;
    }
    return true;
  }

  componentDidMount() {
    const { dispatch, form, match } = this.props;

    const { params: { eventId } } = match;

    const callback = function(d) {
      const { form } = this.props;
      const { setFieldsInitialValue, setFieldsValue } = form;

      let data = {};
      for (var k in d) {
        if (d[k] != null) {
          data[k] = d[k];
        }

        if (k === 'eventTime') {
          data[k] = moment(data[k]);
        }
      }
      setFieldsValue(data);
    }.bind(this);

    if (eventId) {
      dispatch({
        type: 'badEvent/fetchDetail',
        payload: {
          eventId,
        },
      }).then(res => {
        if (res && res.success) {
          callback(res.data);
        }
      });
    }
  }

  render() {
    const { submitting, match: { params } } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    let isEditMode = params.eventId != null;

    function getDateFieldNode(fieldName, title, isRequired, options = {}) {
      const dateFormat = options.format || 'YYYY/MM/DD HH:mm';

      return (
        <FormItem {...formItemLayout} label={(isRequired ? '*' : '') + title}>
          {getFieldDecorator(fieldName, {
            initialValue: getFieldValue(fieldName),
            rules: [
              {
                required: isRequired,
                message: `请输入${title}`,
              },
            ],
          })(<DatePicker format={dateFormat} />)}
        </FormItem>
      );
    }

    function getInputFieldNode(fieldName, title, isRequired, meta) {
      if (meta && meta.isNumber) {
        return (
          <FormItem {...formItemLayout} label={(isRequired ? '*' : '') + title}>
            {getFieldDecorator(fieldName, {
              initialValue: getFieldValue(fieldName),
              rules: [
                {
                  required: isRequired,
                  message: `请输入${title}`,
                },
              ],
            })(<InputNumber {...meta} placeholder={`请输入${title}`} />)}
          </FormItem>
        );
      } else {
        let style = {};
        if (meta && meta.hidden) {
          style.display = 'none';
        }

        return (
          <FormItem {...formItemLayout} style={style} label={(isRequired ? '*' : '') + title}>
            {getFieldDecorator(fieldName, {
              initialValue: getFieldValue(fieldName),
              rules: [
                {
                  required: isRequired,
                  message: `请输入${title}`,
                },
              ],
            })(<Input {...meta} placeholder={`请输入${title}`} />)}
          </FormItem>
        );
      }
    }

    function getTextFieldNode(fieldName, title, isRequired) {
      return (
        <FormItem {...formItemLayout} label={(isRequired ? '*' : '') + title}>
          {getFieldDecorator(fieldName, {
            initialValue: getFieldValue(fieldName),
            rules: [
              {
                required: isRequired,
                message: `请输入${title}`,
              },
            ],
          })(<TextArea style={{ minHeight: 32 }} placeholder={`请输入${title}`} rows={4} />)}
        </FormItem>
      );
    }

    function getSelectFieldNode(fieldName, title, isRequired, options) {
      return (
        <FormItem {...formItemLayout} label={(isRequired ? '*' : '') + title}>
          {getFieldDecorator(fieldName, {
            initialValue: getFieldValue(fieldName),
            rules: [
              {
                required: isRequired,
                message: `请选择${title}`,
              },
            ],
          })(
            <Select placeholder={`请选择${title}`}>
              {options.map(op => (
                <Option key={op.value} value={op.value}>
                  {op.text}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>
      );
    }

    return (
      <PageHeaderLayout
        title={isEditMode ? `不良事件详情` : '不良事件新增'}
        content={
          <div>
            {' '}
            <Link to={'/asset/asset-event/'}>
              <Button>返回列表</Button>
            </Link>
          </div>
        }
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="设备Id">
              {getFieldDecorator('deviceId', {
                rules: [{ required: true, message: '请选择设备...' }],
              })(<DeviceSelect placeholder="请选择设备" />)}
            </FormItem>

            {getInputFieldNode('eventSubject', '事件主题', true)}

            {getTextFieldNode('eventRemark', '事件描述', true)}

            {getDateFieldNode('eventTime', '事件时间', true, {
              style: {
                minWidth: 300,
              },
            })}

            {getInputFieldNode('eventId', '编号', false, { hidden: true })}

            {/* ================================== */}

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                完成
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
