import React, {Component} from 'react';
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment'
import {uploadUrl} from "../../services/api"

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
  Modal
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DepartmentSelect from '../../components/biz/DepartmentSelect'
import styles from '../Forms/style.less';

const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;

@connect(({device,loading}) => ({
  device,
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class DeviceEdit extends Component {

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })


  handleSubmit = e => {
    e.preventDefault();
    const {dispatch,match:{params}} = this.props;
    let isEditMode = params.deviceId != null;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let fData ={
          ...values,
          maintenanceEndDate:moment(values.maintenanceEndDate).format("YYYY/MM/DD"),
          creater:10002,
          modifier:10002
        };


        dispatch({
          type: isEditMode?'device/updateDetail':'device/add',
          payload: fData,
          callback(v){
            dispatch(routerRedux.push(`/device/device-detail/${v.deviceId}`))
          }
        });
      }
    });
  };

  componentDidMount() {
    const {dispatch,form,match} = this.props;
    const {setFieldsInitialValue,setFieldsValue} = form;
    const {params:{deviceId}} = match;

    if (deviceId){
      dispatch({
        type:'device/fetchDetail',
        payload:{
          deviceId
        },
        callback(d){

          let data = {}
          for(var k in d){
            if(d[k]!=null){
              data[k] = d[k]
            }
          }
          setFieldsValue(data)
        }
      })
    }else{
      let i = 14;
      setFieldsInitialValue({
        deviceId: i,
        deviceCode: "code_" + i,
        deviceName: "设备" + i,
        hospitalId: 1,
        departmentId: 2,
        assetNo: "an_" + i,
        deviceModel: "设备型号xxx",
        deviceDesc: "设备描述xxx",
        deviceState: Math.random() > 0.5 ? 1 : 2,
        deviceType: Math.floor(Math.random() * 10) % 3,
        serialNumber: "序列号xxx",
        usageState: Math.random() > 0.5 ? 1 : 0,
        qRCode: "qr_" + i,
        manufacturer: "设备厂1",
        producingPlace: "无锡",
        qrCode: "qr0000000_"+i,
        deviceOwner:"周周",
        purchaseAmount:10000,
        accessory:"123",

        picture1: "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        picture2: "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        picture3: "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        picture4: "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        picture5: "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
      })
    }
  }


  // shouldComponentUpdate(nextProps, nextState){
  //   const {dispatch,form} = this.props
  //   const {match:{params:{deviceId}},device} = nextProps;
  //   if(deviceId){
  //     if (device.byIds[deviceId]){
  //       form.setFieldsValue(device.byIds[deviceId]);
  //       return true;
  //     }else{
  //
  //     }
  //
  //   }
  //   return false
  //
  // }

  render() {
    const {submitting,match:{params}} = this.props;
    const {getFieldDecorator, getFieldValue} = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 7},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
        md: {span: 10},
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 10, offset: 7},
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

    function getDateFieldNode(fieldName, title, isRequired) {
      const dateFormat = 'YYYY/MM/DD';

      return <FormItem {...formItemLayout} label={(isRequired ? "*" : "") + title}>
        {getFieldDecorator(fieldName, {
          initialValue:getFieldValue(fieldName),
          rules: [
            {
              required: isRequired,
              message: `请输入${title}`,
            },
          ],
        })(
          <DatePicker  format={dateFormat} />
        )}
      </FormItem>
    }

    function getInputFieldNode(fieldName, title, isRequired,meta) {

      if (meta && meta.isNumber){
        return <FormItem {...formItemLayout} label={(isRequired ? "*" : "") + title}>
          {getFieldDecorator(fieldName, {
            initialValue:getFieldValue(fieldName),
            rules: [
              {
                required: isRequired,
                message: `请输入${title}`,
              },
            ],
          })(
            <InputNumber {...meta} placeholder={`请输入${title}`}/>
          )}
        </FormItem>
      }else{
        return <FormItem {...formItemLayout} label={(isRequired ? "*" : "") + title}>
          {getFieldDecorator(fieldName, {
            initialValue:getFieldValue(fieldName),
            rules: [
              {
                required: isRequired,
                message: `请输入${title}`,
              },
            ],
          })(
            <Input {...meta} placeholder={`请输入${title}`}/>
          )}
        </FormItem>
      }


    }

    function getTextFieldNode(fieldName, title, isRequired) {

      return <FormItem {...formItemLayout} label={(isRequired ? "*" : "") + title}>
        {getFieldDecorator(fieldName, {
          initialValue:getFieldValue(fieldName),
          rules: [
            {
              required: isRequired,
              message: `请输入${title}`,
            },
          ],
        })(
          <TextArea  style={{minHeight: 32}} placeholder={`请输入${title}`} rows={4}/>
        )}
      </FormItem>
    }

    function getSelectFieldNode(fieldName, title, isRequired, options) {


      return <FormItem {...formItemLayout} label={(isRequired ? "*" : "") + title}>
        {getFieldDecorator(fieldName, {
          initialValue:getFieldValue(fieldName),
          rules: [
            {
              required: isRequired,
              message: `请选择${title}`,
            },
          ],
        })(
          <Select placeholder={`请选择${title}`}>
            {
              options.map((op) => <Option key={op.value} value={op.value}>{op.text}</Option>)
            }
          </Select>
        )}
      </FormItem>
    }



    return (
      <PageHeaderLayout
        title={isEditMode?"设备编辑":"设备新增"}
        content=""
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{marginTop: 8}}>

            {getInputFieldNode("deviceCode", "设备编号", true)}
            {getInputFieldNode("deviceName", "设备名称", true)}

            <FormItem {...formItemLayout} label="*所属医院">
              {getFieldDecorator('hospitalId', {
                rules: [
                  {
                    required: true,
                    message: '请选择所属医院',
                  },
                ],
              })(<DepartmentSelect placeholder="请选择所属医院"/>)}
            </FormItem>

            <FormItem {...formItemLayout} label="*所属部门">
              {getFieldDecorator('departmentId', {
                rules: [
                  {
                    required: true,
                    message: '请选择所属部门',
                  },
                ],
              })(<DepartmentSelect placeholder="请选择所属部门"/>)}
            </FormItem>

            {getInputFieldNode("assetNo", "设备资产编号", false)}
            {getInputFieldNode("deviceModel", "设备型号", true)}
            {getInputFieldNode("serialNumber", "设备序列号", true)}
            {getInputFieldNode("qrCode", "二维码", true)}
            {getInputFieldNode("deviceOwner", "设备负责人", true)}
            {getInputFieldNode("purchaseAmount", "采购金额", true,{
              isNumber:true,
              formatter:value => `\¥${value}`,
              parser:value => value.replace('¥', '')
            })}

            {getDateFieldNode("maintenanceEndDate", "保修期结束时间", true)}

            {getInputFieldNode("manufacturer", "设备厂家", false)}
            {getInputFieldNode("producingPlace", "设备产地", false)}


            {getTextFieldNode("deviceDesc", "设备描述", true)}
            {getTextFieldNode("accessory", "设备附件", true)}



            {getSelectFieldNode("deviceType", "设备类型", true, [
              {
                value: 1,
                text: 'B超'
              }, {
                value: 2,
                text: 'MR'
              }, {
                value: 3,
                text: '普放'
              }
            ])}
            {getSelectFieldNode("deviceState", "设备状态", true, [
              {
                value: 1,
                text: '正常'
              }, {
                value: 2,
                text: '故障'
              }
            ])}
            {getSelectFieldNode("usageState", "使用状态", true, [
              {
                value: 1,
                text: '使用'
              }, {
                value: 0,
                text: '停用'
              }
            ])}

            <FormItem {...formItemLayout} label="图片">

            <div className="clearfix">
              <Upload
                action={uploadUrl}
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
                name={"fileUpload"}
              >
                {fileList.length >= 5 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="device-preview" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </div>
            </FormItem>


            {/* ================================== */}



            <FormItem {...submitFormLayout} style={{marginTop: 32}}>
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
