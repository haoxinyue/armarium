/**
 * Created by Administrator on 2017/8/3.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Button, InputItem, Toast, WingBlank, WhiteSpace, Tabs, ImagePicker, Picker, Switch} from 'antd-mobile';
import {changeHeaderRight, addDevice, getDeviceDetail, updateDevice, uploadFile} from '../../redux/actions'

import Upload from 'rc-upload';
import moment from 'moment'
import './device.less'
import api from "../../api";

const fields = [
    // {key: "deviceId", name: "设备ID", desc: "请输入设备ID", type: "text"},
    {key: "deviceCode", name: "设备编号", desc: "请输入设备编号", required: true, type: "text"},
    {key: "deviceName", name: "设备名称", desc: "请输入设备名称", required: true, type: "text"},
    // {key: "hospitalId", name: "医院", desc: "请选择医院", type: "text",component:"DepartmentSelector"},
    // {key: "departmentId", name: "部门ID", desc: "请输入部门ID", type: "text"},
    // {key: "picture1", name: "设备照片1", desc: "请输入设备照片1", type: "text"},
    // {key: "picture2", name: "设备照片2", desc: "请输入设备照片2", type: "text"},
    // {key: "picture3", name: "设备照片3", desc: "请输入设备照片3", type: "text"},
    // {key: "picture4", name: "设备照片4", desc: "请输入设备照片4", type: "text"},
    // {key: "picture5", name: "设备照片5", desc: "请输入设备照片5", type: "text"},
    {key: "assetNo", name: "资产编号", desc: "请输入设备资产编号", required: true, type: "text"},
    {key: "deviceModel", name: "设备型号", desc: "请输入设备型号", required: true, type: "text"},
    {key: "deviceDesc", name: "设备描述", desc: "请输入设备描述", type: "text"},
    {key: "serialNumber", name: "设备序列号", desc: "请输入设备序列号", type: "text"},
    {key: "qrCode", name: "二维码编号", desc: "请输入二维码编号", required: true, type: "text"},
    {key: "manufacturer", name: "设备厂家", desc: "请输入设备厂家", type: "text"},
    {key: "producingPlace", name: "设备产地", desc: "请输入设备产地", type: "text"},
    {
        key: "deviceState", name: "设备状态", desc: "请设置设备状态", required: true, type: "text", options: [
            [
                {
                    label: '正常',
                    value: 1,
                },
                {
                    label: '故障',
                    value: 2,
                }, {
                label: '无',
                value: 0,
            }
            ]
        ]
    },
    {
        key: "deviceType", name: "设备类型", desc: "请设置设备类型", required: true, type: "text", options: [
            [
                {
                    label: 'B超',
                    value: 1,
                },
                {
                    label: '眼科仪器',
                    value: 2,
                },
                {
                    label: '其他',
                    value: 3,
                }
            ]
        ]
    },
    {
        key: "usageState", name: "使用状态", desc: "请设置使用状态", required: true, type: "text", options: [
            [
                {
                    label: '启用',
                    value: 1,
                },
                {
                    label: '停用',
                    value: 0,
                }
            ]
        ]
    }
];

class DeviceEdit extends Component {

    state = {
        hasError: {},
        value: '',

        imageFiles: [],

        formValue: {
            // DeviceId: '',//设备ID
            deviceCode: '',//设备编号
            deviceName: '',//设备名称
            hospitalId: '',//医院ID
            departmentId: '',//部门ID
            assetNo: '',//设备资产编号
            deviceModel: '',//设备型号
            deviceDesc: '',//设备描述
            deviceState: [1],//设备状态
            deviceType: [1],//设备类型
            serialNumber: '',//设备序列号
            usageState: [1],//使用状态
            qrCode: '',//二维码编号
            manufacturer: '',//设备厂家
            producingPlace: '',//设备产地

            // picture1: '',//设备照片1
            // picture2: '',//设备照片2
            // picture3: '',//设备照片3
            // picture4: '',//设备照片4
            // picture5: '',//设备照片5
            creater: 0,
            modifier: 0,
        },


    }

    onErrorClick = (field) => {
        Toast.info('请输入正确的[' + field.name + ']');
    }

    onChange = (field, value) => {
        // if (value.replace(/\s/g, '').length < 11) {
        //     this.setState({
        //         hasError: true,
        //     });
        // } else {
        //     this.setState({
        //         hasError: false,
        //     });
        // }

        let formValue = this.state.formValue

        formValue[field.key] = value


        this.setState({
            formValue
        });
    }

    onFileChange = (files, type, index) => {
        this.setState({
            imageFiles: files,
        });
    }

    getSubmitFormValue() {

        let formData =  {
            ...this.state.formValue,
            deviceState: this.state.formValue.deviceState[0],
            deviceType: this.state.formValue.deviceType[0],
            usageState: this.state.formValue.usageState[0]
        }
        const { match: {params: {deviceId}}} = this.props;

        if (this.state.imageFiles&&this.state.imageFiles.length){
            this.state.imageFiles.forEach((f,i)=>{
                formData['picture'+(i+1)] = f.url
            })
        }
        if (deviceId){
            formData.deviceId = deviceId
        }

        return formData
    }

    save() {
        const {dispatch,history, match: {params: {deviceId}}} = this.props;

        for (let i = 0; i < fields.length; i++) {
            let field = fields[i]
            if (field.required && !this.state.formValue[field.key]) {
                Toast.info(field.desc, 1);
                return
            }
        }

        if (deviceId) {
            dispatch(updateDevice(this.getSubmitFormValue()))
                .then(res => {
                    console.log(res)
                    if (res.payload.code == 0) {
                        Toast.hide();
                        Toast.success("保存成功", 0.5);
                        // dispatch(addDevice())
                        history.push(`/deviceDetail/${deviceId}`);
                    } else {
                        Toast.hide();
                        Toast.fail("保存失败，请稍后再试", 0.5);
                    }
                })
                .catch(err => {
                    Toast.hide();
                    Toast.fail("保存失败，请稍后再试:" + JSON.stringify(err), 0.5);
                })

        } else {

            dispatch(addDevice(this.getSubmitFormValue()))
                .then(res => {
                    if (res.payload.code == 0) {
                        let deviceId = res.payload.data.deviceId;
                        Toast.hide();
                        Toast.success("保存成功", 0.5);
                        // dispatch(addDevice())
                        history.push(`/deviceDetail/${deviceId}`);
                    } else {
                        Toast.hide();
                        Toast.fail("保存失败，请稍后再试", 0.5);
                    }
                })
                .catch(err => {
                    Toast.hide();
                    Toast.fail("保存失败，请稍后再试:" + JSON.stringify(err), 0.5);
                })
        }

    }


    componentWillReceiveProps(nextProps, nextState) {
        const {dispatch, match: {params: {deviceId}}, device, userInfo} = this.props;
        const {match: {params: {deviceId: NextDeviceId}}} = nextProps;
        if (NextDeviceId && NextDeviceId !== deviceId) {
            console.log("ReceiveProps----");
            dispatch(getDeviceDetail({
                deviceId: Number(NextDeviceId)
            }));
            return false
        }

        let info = deviceId && device.byIds[deviceId];
        if (info) {
            console.log("update----");
            let formValue = {
                creater: userInfo.userId,
                modifier: userInfo.userId,
            }
            for (let k in this.state.formValue) {
                if (info[k] != null) {

                    if (k === "maintenanceEndDate") {
                        formValue[k] = moment(info[k])
                    } else if (["deviceState", "deviceType", "usageState"].indexOf(k) !== -1) {
                        formValue[k] = [info[k]]
                    } else {
                        formValue[k] = info[k]
                    }
                }
            }

            let imageFiles = [];
            info.picture1 && imageFiles.push({
                url: info.picture1
            });
            info.picture2 && imageFiles.push({
                url: info.picture2
            });
            info.picture3 && imageFiles.push({
                url: info.picture3
            });
            info.picture4 && imageFiles.push({
                url: info.picture4
            });
            info.picture5 && imageFiles.push({
                url: info.picture5
            });


            this.setState({
                formValue,
                imageFiles
            })
        }
        return true
    }

    componentWillUpdate() {

    }

    componentDidMount() {
        const {dispatch, match: {params: {deviceId}}} = this.props;
        dispatch(changeHeaderRight([
            <Button key="0" size="small" type="primary" onClick={this.save.bind(this)}>保存</Button>
        ]))

        if (deviceId) {
            console.log("mount----")
            dispatch(getDeviceDetail({
                deviceId: Number(deviceId)
            }));
        }
    }

    onImageUploaded(res) {
        console.log('onSuccess', res);
        this.state.imageFiles.push({
            url: res.data
        })
        this.setState({
            imageFiles: this.state.imageFiles
        })

    }

    render() {
        const tabs = [
            {title: '资产信息', sub: '1'},
            {title: '图片', sub: '2'}
        ];


        const FieldSelector = props => (
            <div className="am-list-item am-input-item am-list-item-middle field-item" onClick={props.onClick}>
                <div className="am-list-line">
                    <div className="am-input-label am-input-label-5">{props.children}</div>
                    <div className="am-input-control"><span className="am-input-extra">{props.extra}</span></div>
                </div>
            </div>
        );


        function getFieldEle(field) {

            // if(field.component){
            //     const fieldComponent =require('')
            //     return <field.component field={field}  value={this.state.formValue[field.key]} />
            // }


            if (field.options && field.options.length) {

                let value = this.state.formValue[field.key]
                for (let i = 0; i < field.options.length; i++) {

                }

                return <Picker
                    className="field-item"
                    data={field.options}
                    title={field.name}
                    cascade={false}
                    extra={field.desc}

                    value={value}
                    onChange={this.onChange.bind(this, field)}
                    onOk={this.onChange.bind(this, field)}
                >
                    <FieldSelector>{field.name}</FieldSelector>
                </Picker>
            }


            return <InputItem
                className="field-item"
                type={field.text}
                // labelNumber={labelLength}
                placeholder={field.desc}
                error={this.state.hasError[field.key]}
                onErrorClick={this.onErrorClick.bind(this, field)}
                onChange={this.onChange.bind(this, field)}
                value={this.state.formValue[field.key]}
            >{field.name}</InputItem>
        }

        let uploaderProps = {
            action: api.baseUrl() + api.fileUpload,
            // data: { a: 1, b: 2 },
            // headers: {
            //     Authorization: 'xxxxxxx',
            // },
            name: 'fileUpload',
            // headers:{
            //     'Content-type':'multipart/form-data'
            // },
            multiple: false,
            beforeUpload: (file) => {
                // console.log('beforeUpload', file.name);
            },
            onStart: (file) => {
                // console.log('onStart', file.name);
                // this.refs.inner.abort(file);
            },
            onSuccess: this.onImageUploaded.bind(this),
            onProgress(step, file) {
                // console.log('onProgress', Math.round(step.percent), file.name);
            },
            onError(err) {
                // console.log('onError', err);
            },
        }

        return (
            <div className="device-edit">
                <Tabs
                    tabs={tabs}
                    className="detail-tab"
                    initialPage={0}
                    onChange={(tab, index) => {
                        // console.log('onChange', index, tab);
                    }}
                    onTabClick={(tab, index) => {
                        // console.log('onTabClick', index, tab);
                    }}
                    renderTab={tab => <span>{tab.title}</span>}
                >
                    <div className="tab-content">
                        <List className="field-list" renderHeader={() => '编辑'}>
                            <WingBlank size="sm">
                                {fields.map((field, i) => <div key={i}>{getFieldEle.bind(this)(field)}</div>)}
                                <WhiteSpace size="large"/>
                            </WingBlank>

                        </List>
                    </div>
                    <div className="tab-content">
                        <List className="field-list" renderHeader={() => '编辑图片'}>
                            <div className="block-list">
                                <li>
                                    <div className="detail-block">

                                        <div className="block-content">
                                            <ImagePicker
                                                files={this.state.imageFiles}
                                                onChange={this.onFileChange}
                                                onImageClick={(index, fs) => console.log(index, fs)}
                                                selectable={false}
                                                accept="image/gif,image/jpeg,image/jpg,image/png"
                                            />
                                            <Upload

                                                {...uploaderProps}
                                                className={"am-flexbox am-flexbox-align-center"}
                                                component="div"
                                                style={{
                                                    display: this.state.imageFiles.length < 5 ? 'inline-block' : 'none',

                                                }}
                                            >
                                                <Button type="primary" size="small" inline>上传</Button>
                                            </Upload>
                                        </div>
                                    </div>

                                </li>
                            </div>
                        </List>
                    </div>
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {sidebarStatus} = state.app;
    const {userInfo} = state.auth;

    return {
        sidebarStatus,
        device: state.device,
        userInfo
    }
}

export default connect(mapStateToProps)(DeviceEdit)