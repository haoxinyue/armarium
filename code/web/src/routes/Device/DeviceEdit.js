import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import QRCode from 'qrcode.react';

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
  Timeline,
  Checkbox,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DepartmentSelect from '../../components/biz/DepartmentSelect';
import styles from '../Forms/style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ device, hospital, user, loading }) => ({
  device,
  hospital,
  currentUser: user.currentUser || {},
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class DeviceEdit extends Component {
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

  handleChange = ({ fileList }) => {
    const { setFieldsValue } = this.props.form;
    this.setState({ fileList });
    let files = {
      picture1: '',
      picture2: '',
      picture3: '',
      picture4: '',
      picture5: '',
    };
    // console.log(fileList);

    fileList.forEach((f, i) => {
      if (f.response) {
        files['picture' + (i + 1)] = f.response.data;
      } else {
        files['picture' + (i + 1)] = f.url;
      }
    });
    setFieldsValue(files);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, match: { params }, currentUser } = this.props;
    let isEditMode = params.deviceId != null;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let fData = {
          ...values,
          maintenanceEndDate: moment(values.maintenanceEndDate).format('YYYY/MM/DD'),
          needInspection: values.needInspection ? 1 : 0,
          needMaintain: values.needMaintain ? 1 : 0,
          needMetering: values.needMetering ? 1 : 0,
          creater: currentUser.userId,
          modifier: currentUser.userId,
        };

        if (!isEditMode) {
          delete fData['deviceId'];
        }

        dispatch({
          type: isEditMode ? 'device/updateDetail' : 'device/add',
          payload: fData,
          callback(v) {
            if (v.success) {
              message.success('保存成功');
              dispatch(routerRedux.push(`/device/device-detail/${v.deviceId}`));
            } else {
              message.error('保存失败');
            }
          },
        });
      }
    });
  };

  getFileInfo(url, name, uid) {
    return {
      uid: uid || name,
      name: name,
      status: 'done',
      url: url,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('==componentWillReceiveProps==');
    const { device, match: { params: { deviceId } } } = this.props;
    const { device: nextDevice, match: { params: { deviceId: nextDeviceId } } } = nextProps;
    const info = device.byIds[nextDeviceId];
    const nextInfo = nextDevice.byIds[nextDeviceId];
    if (
      deviceId === nextDeviceId &&
      nextInfo &&
      (!info || JSON.stringify(info) !== JSON.stringify(nextInfo))
    ) {
      let fileList = [];
      // fileList.push({
      //   uid: 1,
      //   name: 'xxx.png',
      //   status: 'done',
      //   url: "http://47.100.198.255:8080/accessory/queryPic?fileName=if_hospital_308245.png"
      // });
      if (nextInfo && nextInfo.picture1) {
        fileList.push(this.getFileInfo(nextInfo.picture1, 'pic1'));
      }
      if (nextInfo && nextInfo.picture2) {
        fileList.push(this.getFileInfo(nextInfo.picture2, 'pic2'));
      }
      if (nextInfo && nextInfo.picture3) {
        fileList.push(this.getFileInfo(nextInfo.picture3, 'pic3'));
      }
      if (nextInfo && nextInfo.picture4) {
        fileList.push(this.getFileInfo(nextInfo.picture4, 'pic4'));
      }
      if (nextInfo && nextInfo.picture5) {
        fileList.push(this.getFileInfo(nextInfo.picture5, 'pic5'));
      }

      this.setState({
        fileList,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { dispatch, match: { params: { deviceId } } } = this.props;
    const { match: { params: { deviceId: NextDeviceId } } } = nextProps;
    if (NextDeviceId && NextDeviceId !== deviceId) {
      dispatch({
        type: 'device/fetchDetail',
        payload: { deviceId: NextDeviceId },
      });
      return true;
    }
    return true;
  }

  componentDidMount() {
    const { dispatch, form, match } = this.props;

    const { params: { deviceId } } = match;

    const callback = function(d) {
      const { form } = this.props;
      const { setFieldsInitialValue, setFieldsValue } = form;

      let data = {};
      for (var k in d) {
        if (d[k] != null) {
          data[k] = d[k];
        }

        if (k === 'maintenanceEndDate') {
          data[k] = moment(data[k]);
        }
      }
      setFieldsValue(data);
      // setFields(data);
    }.bind(this);

    if (deviceId) {
      dispatch({
        type: 'device/fetchDetail',
        payload: {
          deviceId,
        },
        callback,
      });
    } else {
      // let i = 18;
      // setFieldsInitialValue({
      //   deviceId: i,
      //   deviceCode: "code_" + i,
      //   deviceName: "设备" + i,
      //   hospitalId: 1,
      //   departmentId: 2,
      //   assetNo: "an_" + i,
      //   deviceModel: "设备型号xxx",
      //   deviceDesc: "设备描述xxx",
      //   deviceState: Math.random() > 0.5 ? 1 : 2,
      //   deviceType: Math.floor(Math.random() * 10) % 3,
      //   serialNumber: "序列号xxx",
      //   usageState: Math.random() > 0.5 ? 1 : 0,
      //   qRCode: "qr_" + i,
      //   manufacturer: "设备厂1",
      //   producingPlace: "无锡",
      //   qrCode: "qr0000000_" + i,
      //   deviceOwner: "周周",
      //   purchaseAmount: 10000,
      //   accessory: "123",
      //
      //   picture1: "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
      //   picture2: "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
      //   picture3: "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
      //   picture4: "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
      //   picture5: "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
      // })
    }
  }

  render() {
    const { submitting, match: { params }, hospital } = this.props;
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

    let isEditMode = params.deviceId != null;

    const { previewVisible, previewImage, fileList } = this.state;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    function getCheckFieldNode(fieldName, title, isRequired, meta) {
      return (
        <FormItem {...formItemLayout} label={(isRequired ? '*' : '') + title}>
          {getFieldDecorator(fieldName, {
            initialValue: getFieldValue(fieldName) || meta.initialValue,
            rules: [],
          })(<Checkbox {...meta} />)}
        </FormItem>
      );
    }

    function getDateFieldNode(fieldName, title, isRequired) {
      const dateFormat = 'YYYY/MM/DD';

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
              initialValue: getFieldValue(fieldName) || meta.initialValue,
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
      <PageHeaderLayout title={isEditMode ? '设备编辑' : '设备新增'} content="">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            {getInputFieldNode('deviceCode', '设备编号', false)}
            {getInputFieldNode('deviceName', '设备名称', false)}

            {getSelectFieldNode(
              'hospitalId',
              '所属医院',
              true,
              hospital.list.map(hid => {
                let h = hospital.byIds[hid];
                return { value: h.hospitalId, text: h.hospitalName };
              })
            )}

            <FormItem {...formItemLayout} label="*所属部门">
              {getFieldDecorator('departmentId', {
                rules: [
                  {
                    required: true,
                    message: '请选择所属部门',
                  },
                ],
              })(<DepartmentSelect placeholder="请选择所属部门" />)}
            </FormItem>

            {getInputFieldNode('assetNo', '设备资产编号', false)}
            {getInputFieldNode('deviceModel', '设备型号', false)}
            {getInputFieldNode('serialNumber', '设备序列号', false)}

            {getInputFieldNode('deviceOwner', '设备负责人', false)}
            {getInputFieldNode('purchaseAmount', '采购金额', false, {
              isNumber: true,
              formatter: value => `\¥${value}`,
              parser: value => value.replace('¥', ''),
            })}

            {getDateFieldNode('maintenanceEndDate', '保修期结束时间', false)}

            {getInputFieldNode('manufacturer', '设备厂家', false)}
            {getInputFieldNode('producingPlace', '设备产地', false)}

            {getTextFieldNode('deviceDesc', '设备描述', false)}
            {getTextFieldNode('accessory', '设备附件', false)}

            {getSelectFieldNode('deviceType', '设备类型', true, [
              {
                value: 1,
                text: 'B超',
              },
              {
                value: 2,
                text: 'MR',
              },
              {
                value: 3,
                text: '普放',
              },
            ])}
            {getSelectFieldNode('deviceState', '设备状态', true, [
              {
                value: 1,
                text: '正常',
              },
              {
                value: 2,
                text: '故障',
              },
            ])}
            {getSelectFieldNode('usageState', '使用状态', true, [
              {
                value: 1,
                text: '使用',
              },
              {
                value: 0,
                text: '停用',
              },
            ])}

            <FormItem {...formItemLayout} label="图片">
              <div className="clearfix">
                <Upload
                  action={uploadUrl}
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                  name={'fileUpload'}
                >
                  {fileList.length >= 5 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="device-preview" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </div>
            </FormItem>

            {getInputFieldNode('deviceId', '设备编号', false, { hidden: true })}

            {getCheckFieldNode('needInspection', '是否需要巡检', false, { hidden: true })}
            {getFieldValue('needInspection') &&
              getInputFieldNode('inspectionInterval', '巡检间隔', false, {
                isNumber: true,
                min: 1,
                initialValue: 30,
                formatter: value => `${value}天`,
                parser: value => value.replace('天', ''),
                className: ['input-number-right'],
              })}

            {getCheckFieldNode('needMaintain', '是否需要保养', false, { hidden: true })}
            {getFieldValue('needMaintain') &&
              getInputFieldNode('maintenanceInterval', '保养间隔', false, {
                isNumber: true,
                min: 1,
                precision: 0,
                initialValue: 30,
                formatter: value => `${value}天`,
                parser: value => value.replace('天', ''),
              })}

            {getCheckFieldNode('needMetering', '是否需要计量', false, { hidden: true })}
            {getFieldValue('needMetering') &&
              getInputFieldNode('meteringInterval', '计量间隔', false, {
                isNumber: true,
                min: 1,
                initialValue: 30,
                formatter: value => `${value}天`,
                parser: value => value.replace('天', ''),
              })}

            {getInputFieldNode('picture1', '', false, { hidden: true })}
            {getInputFieldNode('picture2', '', false, { hidden: true })}
            {getInputFieldNode('picture3', '', false, { hidden: true })}
            {getInputFieldNode('picture4', '', false, { hidden: true })}
            {getInputFieldNode('picture5', '', false, { hidden: true })}

            {/* ================================== */}

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                保存
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
