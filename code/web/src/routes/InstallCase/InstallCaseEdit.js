import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';

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
import DepartmentSelect from '../../components/biz/DepartmentSelect';
import styles from '../Forms/style.less';
import HospitalSelect from '../../components/biz/HospitalSelect';
import EngineerSelect from '../../components/biz/EngineerSelect';
import DeviceTypeSelect from '../../components/biz/DeviceTypeSelect';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

@connect(({ installCase, hospital, user, loading }) => ({
  installCase,
  hospital,
  currentUser: user.currentUser || {},
}))
@Form.create()
export default class InstallCaseEdit extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, match: { params }, currentUser = {} } = this.props;
    let isEditMode = params.deviceId != null;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let fData = {
          ...values,
          needInspection: values.needInspection ? 1 : 0,
          needMetering: values.needMetering ? 1 : 0,
          expectedTime: values.expectedTime && moment(values.expectedTime).format('YYYY/MM/DD'),
          setupTime: values.setupTime && moment(values.setupTime).format('YYYY/MM/DD'),
          creater: currentUser.userId,
          modifier: currentUser.userId,
        };

        if (!isEditMode) {
          delete fData['caseId'];
        }

        dispatch({
          type: isEditMode ? 'installCase/complete' : 'installCase/add',
          payload: fData,
        }).then(
          success => {
            if (success) {
              message.success('保存成功');
              dispatch({
                type: 'installCase/fetchDetail',
                payload: {
                  caseId: fData.caseId,
                },
              });
              // dispatch(routerRedux.push(`/device/device-detail/${v.deviceId}`));
            } else {
              message.error('保存失败');
            }
          },
          res2 => {
            console.log('res2', res2);
          }
        );
      }
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { dispatch, match: { params: { caseId } } } = this.props;
    const { match: { params: { caseId: NextCaseId } } } = nextProps;
    if (NextCaseId && NextCaseId !== caseId) {
      dispatch({
        type: 'installCase/fetchDetail',
        payload: { caseId: NextCaseId },
      });
      return true;
    }
    return true;
  }

  componentDidMount() {
    const { dispatch, form, match } = this.props;

    const { params: { caseId } } = match;

    const callback = function(d) {
      const { form } = this.props;
      const { setFieldsInitialValue, setFieldsValue } = form;

      let data = {};
      for (var k in d) {
        if (d[k] != null) {
          data[k] = d[k];
        }

        if (k === 'expectedTime' || k === 'setupTime') {
          data[k] = moment(data[k]);
        } else if (k === 'needMetering' || k === 'needInspection') {
          data[k] = data[k] == 1;
        }
      }
      setFieldsValue(data);
    }.bind(this);

    if (caseId) {
      dispatch({
        type: 'installCase/fetchDetail',
        payload: {
          caseId,
        },
        callback,
      });
    }
  }

  render() {
    const { submitting, match: { params }, installCase } = this.props;
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

    let isEditMode = params.caseId != null;

    let mCase = isEditMode && installCase.byIds[params.caseId];

    let devices = [];

    if (mCase) {
      //暂时只有一个
      devices.push({
        deviceId: mCase.deviceId,
        deviceName: mCase.deviceName,
      });
    }

    function getDateFieldNode(fieldName, title, isRequired, options = {}) {
      const dateFormat = options.format || 'YYYY/MM/DD';

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
        title={isEditMode ? `安装工单 ${params.caseId}` : '安装工单新增'}
        content=""
      >
        {isEditMode && (
          <Card bordered={false}>
            <List
              className={'ant-col-md-16 ant-col-offset-4'}
              grid={{ gutter: 4, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 3 }}
              header={<div>关联设备</div>}
              bordered
              dataSource={devices}
              renderItem={item => (
                <List.Item style={{ textAlign: 'center', padding: 8 }}>
                  <Card title={item.deviceName}>
                    <Link to={'/device/device-edit/' + item.deviceId}>编辑</Link>
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        )}

        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            {getInputFieldNode('deviceName', '设备名称', true)}

            <FormItem {...formItemLayout} label="*所属医院">
              {getFieldDecorator('hospitalId', {
                initialValue: 1000005,
                rules: [
                  {
                    required: true,
                    message: '请选择所属医院',
                  },
                ],
              })(<HospitalSelect placeholder="请选择所属医院" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="*所属部门">
              {getFieldDecorator('deptId', {
                rules: [
                  {
                    required: true,
                    message: '请选择所属部门',
                  },
                ],
              })(
                <DepartmentSelect
                  hospitalId={getFieldValue('hospitalId')}
                  placeholder="请选择所属部门"
                />
              )}
            </FormItem>

            {getInputFieldNode('deviceModel', '设备型号', true)}

            {getDateFieldNode('expectedTime', '期望安装时间', true)}

            {getDateFieldNode('setupTime', '安装时间', true)}

            {getTextFieldNode('caseRemark', '工单描述', true)}

            <FormItem {...formItemLayout} label="设备类型1">
              {getFieldDecorator('deviceType', {
                rules: [
                  {
                    required: false,
                    message: '请选择设备类型',
                  },
                ],
              })(<DeviceTypeSelect placeholder="请选择设备类型" />)}
            </FormItem>

            {/*{getSelectFieldNode('deviceType', '设备类型', true, [
              {
                value: 1,
                text: 'B超',
              },
              {
                value: 2,
                text: 'MR',
              },
              {
                value: 0,
                text: '其他',
              },
            ])}*/}

            {getInputFieldNode('deviceId', '设备编号', false, { hidden: true })}

            <FormItem {...formItemLayout} label="*安装人">
              {getFieldDecorator('assigneeUserId', {
                rules: [
                  {
                    required: true,
                    message: '请选择安装人',
                  },
                ],
              })(<EngineerSelect placeholder="请选择安装人" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="*是否需要巡检">
              {getFieldDecorator('needInspection', {
                initialValue: false,
                rules: [],
              })(<Checkbox />)}
            </FormItem>

            <FormItem {...formItemLayout} label="*是否需要计量">
              {getFieldDecorator('needMetering', {
                initialValue: false,
                rules: [],
              })(<Checkbox />)}
            </FormItem>

            {getTextFieldNode('setupRemark', '安装描述', true)}

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
