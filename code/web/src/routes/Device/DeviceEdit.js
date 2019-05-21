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
  Divider,
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
  Tabs,
} from 'antd';

const TabPane = Tabs.TabPane;

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DepartmentSelect from '../../components/biz/DepartmentSelect';
import { AttachmentTypes, AttachmentFileTypes } from '../../utils/constants';
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

  handleAttachUploadFileChange = ({ fileList }) => {
    const { setFieldsValue, getFieldValue } = this.props.form;
    let accessories = getFieldValue('accessories') || [];
    // this.setState({fileList});
    if (fileList[0] && fileList[0].attachmentId) {
      setFieldsValue({
        accessories: accessories.concat(fileList),
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, match: { params }, currentUser } = this.props;
    let isEditMode = params.deviceId != null;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let fData = {
          ...values,
          maintenanceEndDate:
            values.maintenanceEndDate && moment(values.maintenanceEndDate).format('YYYY/MM/DD'),
          setupDate: values.setupDate && moment(values.setupDate).format('YYYY/MM/DD'),
          force_inspection: values.force_inspection ? 1 : 0,
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
        }).then(
          res => {
            if (res.deviceId) {
              message.success('保存成功');
              dispatch(routerRedux.push(`/device/device-detail/${res.deviceId}`));
            } else {
              message.error('保存失败');
            }
          },
          () => {
            message.error('保存失败');
          }
        );
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

        if (k.indexOf('Date') !== -1) {
          data[k] = data[k] && moment(data[k]);
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
    }
  }

  render() {
    const { submitting, match: { params }, hospital } = this.props;
    const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
    let accessories = getFieldValue('accessories') || [];

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
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
      let val = getFieldValue(fieldName) || meta.initialValue;
      return (
        <FormItem {...formItemLayout} label={(isRequired ? '*' : '') + title}>
          {getFieldDecorator(fieldName, {
            valuePropName: 'checked',
            initialValue: val === true || val === 1,
            rules: [],
          })(<Checkbox {...meta} />)}
        </FormItem>
      );
    }

    function getDateFieldNode(fieldName, title, isRequired) {
      const dateFormat = 'YYYY/MM/DD';
      let fv = getFieldValue(fieldName);
      return (
        <FormItem {...formItemLayout} label={(isRequired ? '*' : '') + title}>
          {getFieldDecorator(fieldName, {
            initialValue: fv && moment(fv),
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
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <Tabs defaultActiveKey="1" type="card" mode={'left'}>
            <TabPane tab="基本信息" key="1">
              <Card bordered={false}>
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
                    value: 0,
                    text: '其他',
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

                {getInputFieldNode('deviceId', '设备编号', false, { hidden: true })}

                {getInputFieldNode('picture1', '', false, { hidden: true })}
                {getInputFieldNode('picture2', '', false, { hidden: true })}
                {getInputFieldNode('picture3', '', false, { hidden: true })}
                {getInputFieldNode('picture4', '', false, { hidden: true })}
                {getInputFieldNode('picture5', '', false, { hidden: true })}
              </Card>
              {/* ================================== */}
            </TabPane>

            <TabPane tab="图片信息" key="2">
              <Card bordered={false}>
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
              </Card>
            </TabPane>

            <TabPane tab="资产信息" key="3">
              <Card bordered={false}>
                {getInputFieldNode('assetNo', '设备资产编号', false)}
                {getInputFieldNode('deviceModel', '设备型号', false)}
                {getInputFieldNode('serialNumber', '设备序列号', false)}

                {getInputFieldNode('deviceOwner', '设备负责人', false)}
                {getInputFieldNode('purchaseAmount', '采购金额', false, {
                  isNumber: true,
                  formatter: value => `\¥${value}`,
                  parser: value => value.replace('¥', ''),
                })}
                {getDateFieldNode('storageDate', '入库日期', false)}

                <Divider style={{ marginBottom: 32 }} />

                {getInputFieldNode('manufacturer', '设备厂家', false)}
                {getInputFieldNode('producingPlace', '设备产地', false)}

                {getTextFieldNode('deviceDesc', '设备描述', false)}
                {getTextFieldNode('accessory', '设备附件', false)}

                <Divider style={{ marginBottom: 32 }} />

                {getDateFieldNode('setupDate', '安装日期', false)}
                {getDateFieldNode('useDate', '使用日期', false)}
                {getDateFieldNode('acceptDate', '验收日期', false)}
                {getTextFieldNode('acceptRemark', '验收评价', false)}
                {getTextFieldNode('acceptFile', '验收清单', false)}
              </Card>
            </TabPane>

            <TabPane tab="设备附件" key="4">
              <Card bordered={false}>
                {accessories.map(att => (
                  <div>
                    <span>附件类型</span>
                    <Select defaultValue={att.attachmentType + ''} style={{ width: 120 }}>
                      {Object.keys(AttachmentTypes).map(type => (
                        <Option
                          value={type}
                          onChange={v => {
                            att.attachmentType = v;
                            setFieldsValue({
                              accessories: accessories,
                            });
                          }}
                        >
                          {AttachmentTypes[type]}
                        </Option>
                      ))}
                    </Select>
                    <span>文件名称</span>
                    <Input
                      style={{ width: 200 }}
                      value={att.attachmentName}
                      onChange={v => {
                        att.attachmentType = v;
                        setFieldsValue({
                          accessories: accessories,
                        });
                      }}
                    />
                    <span>文件类型：{AttachmentFileTypes[att.fileType] || '其他'}</span>

                    <Button
                      onClick={() => {
                        setFieldsValue({
                          accessories: accessories.filter(t => t != att),
                        });
                      }}
                    >
                      删除
                    </Button>
                  </div>
                ))}

                <Upload
                  action={uploadUrl}
                  showUploadList={false}
                  onChange={this.handleAttachUploadFileChange}
                  name={'fileUpload'}
                >
                  {accessories.length >= 5 ? null : uploadButton}
                </Upload>
              </Card>
            </TabPane>

            <TabPane tab="合同保修" key="5">
              <Card bordered={false}>
                {getDateFieldNode('maintenanceEndDate', '保修期结束时间', false)}
                {getDateFieldNode('warrantyBeginDate', '合同开始时间', false)}
                {getDateFieldNode('warrantyEndDate', '合同结束时间', false)}
                {getInputFieldNode('warrantyAmount', '合同金额', false, {
                  isNumber: true,
                  formatter: value => `\¥${value}`,
                  parser: value => value.replace('¥', ''),
                })}

                {getTextFieldNode('warrantyContent', '合同内容', false)}
              </Card>
            </TabPane>

            <TabPane tab="售后信息" key="6">
              <Card bordered={false}>
                {getInputFieldNode('salesSupplier', '销售供应商名称', false)}
                {getInputFieldNode('salesSupplierContact', '销售供应商联系人', false)}
                {getInputFieldNode('salesSupplierPhone', '销售供应商电话', false)}
                {getInputFieldNode('salesSupplierDesc', '销售供应商描述', false)}
                {getInputFieldNode('afterSaleProvider', '售后服务供应商名称', false)}
                {getInputFieldNode('afterSaleProviderEngineer', '售后服务供应商工程师', false)}
                {getInputFieldNode('afterSaleProviderPhone', '售后服务供应商电话', false)}
                {getTextFieldNode('afterSaleProviderDesc', '售后服务供应商描述', false)}
              </Card>
            </TabPane>

            <TabPane tab="检测设置" key="7">
              <Card bordered={false}>
                {getCheckFieldNode('force_inspection', '是否强检设备', false, { hidden: true })}
                {getCheckFieldNode('needInspection', '是否需要巡检', false, { hidden: true })}
                {getFieldValue('needInspection')
                  ? getInputFieldNode('inspectionInterval', '巡检间隔', false, {
                      isNumber: true,
                      min: 1,
                      initialValue: 30,
                      formatter: value => `${value}天`,
                      parser: value => value.replace('天', ''),
                      className: ['input-number-right'],
                    })
                  : ''}

                {getCheckFieldNode('needMaintain', '是否需要保养', false, { hidden: true })}
                {getFieldValue('needMaintain')
                  ? getInputFieldNode('maintenanceInterval', '保养间隔', false, {
                      isNumber: true,
                      min: 1,
                      precision: 0,
                      initialValue: 30,
                      formatter: value => `${value}天`,
                      parser: value => value.replace('天', ''),
                    })
                  : ''}

                {getCheckFieldNode('needMetering', '是否需要计量', false, { hidden: true })}
                {getFieldValue('needMetering')
                  ? getInputFieldNode('meteringInterval', '计量间隔', false, {
                      isNumber: true,
                      min: 1,
                      initialValue: 30,
                      formatter: value => `${value}天`,
                      parser: value => value.replace('天', ''),
                    })
                  : ''}
              </Card>
            </TabPane>
          </Tabs>

          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              保存
            </Button>
          </FormItem>
        </Form>
      </PageHeaderLayout>
    );
  }
}
