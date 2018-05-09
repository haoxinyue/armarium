/**
 * Created by Administrator on 2017/8/3.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Button, InputItem, Toast, WingBlank, WhiteSpace, Tabs, ImagePicker, Picker, Switch} from 'antd-mobile';
import {changeHeaderRight, addDevice} from '../../redux/actions'
import axios from '../../http'
import api from '../../api'

import './device.less'

const fields = [
    // {key: "DeviceId", name: "设备ID", desc: "请输入设备ID", type: "text"},
    {key: "DeviceCode", name: "设备编号", desc: "请输入设备编号", required: true, type: "text"},
    {key: "DeviceName", name: "设备名称", desc: "请输入设备名称", required: true, type: "text"},
    // {key: "HospitalId", name: "医院", desc: "请选择医院", type: "text",component:"DepartmentSelector"},
    // {key: "DepartmentId", name: "部门ID", desc: "请输入部门ID", type: "text"},
    // {key: "Picture1", name: "设备照片1", desc: "请输入设备照片1", type: "text"},
    // {key: "Picture2", name: "设备照片2", desc: "请输入设备照片2", type: "text"},
    // {key: "Picture3", name: "设备照片3", desc: "请输入设备照片3", type: "text"},
    // {key: "Picture4", name: "设备照片4", desc: "请输入设备照片4", type: "text"},
    // {key: "Picture5", name: "设备照片5", desc: "请输入设备照片5", type: "text"},
    {key: "AssetNo", name: "资产编号", desc: "请输入设备资产编号", required: true, type: "text"},
    {key: "DeviceModel", name: "设备型号", desc: "请输入设备型号", required: true, type: "text"},
    {key: "DeviceDesc", name: "设备描述", desc: "请输入设备描述", type: "text"},
    {key: "SerialNumber", name: "设备序列号", desc: "请输入设备序列号", type: "text"},
    {key: "QrCode", name: "二维码编号", desc: "请输入二维码编号", required: true, type: "text"},
    {key: "Manufacturer", name: "设备厂家", desc: "请输入设备厂家", type: "text"},
    {key: "ProducingPlace", name: "设备产地", desc: "请输入设备产地", type: "text"},
    {
        key: "DeviceState", name: "设备状态", desc: "请设置设备状态", required: true, type: "text", options: [
        [
            {
                label: '正常',
                value: 1,
            },
            {
                label: '故障',
                value: 2,
            }]
    ]
    },
    {
        key: "DeviceType", name: "设备类型", desc: "请设置设备类型", required: true, type: "text", options: [
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
        key: "UsageState", name: "使用状态", desc: "请设置使用状态", required: true, type: "text", options: [
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

        files: [],

        formValue: {
            // DeviceId: '',//设备ID
            DeviceCode: '',//设备编号
            DeviceName: '',//设备名称
            HospitalId: '',//医院ID
            DepartmentId: '',//部门ID
            AssetNo: '',//设备资产编号
            DeviceModel: '',//设备型号
            DeviceDesc: '',//设备描述
            DeviceState: [1],//设备状态
            DeviceType: [1],//设备类型
            SerialNumber: '',//设备序列号
            UsageState: [1],//使用状态
            QrCode: '',//二维码编号
            Manufacturer: '',//设备厂家
            ProducingPlace: '',//设备产地

            // Picture1: '',//设备照片1
            // Picture2: '',//设备照片2
            // Picture3: '',//设备照片3
            // Picture4: '',//设备照片4
            // Picture5: '',//设备照片5
            Creator: 1,
            Modifier: 1,
        }
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
        // console.log(files, type, index);
        this.setState({
            files,
        });
    }

    getSubmitFormValue() {
        return {
            ...this.state.formValue,
            DeviceState: this.state.formValue.DeviceState[0],
            DeviceType: this.state.formValue.DeviceType[0],
            UsageState: this.state.formValue.UsageState[0]
        }
    }

    save() {
        const {dispatch, history} = this.props;

        for (let i = 0; i < fields.length; i++) {
            let field = fields[i]
            if (field.required && !this.state.formValue[field.key]) {
                Toast.info(field.desc, 1);
                return
            }
        }

        if (this.state.formValue.DeviceId) {

        } else {
            Toast.success("保存成功", 0.5);
            // dispatch(addDevice())
            history.push('/devices');

            // axios.http.post(api.deviceAdd, this.getSubmitFormValue())
            //     .then(res => {
            //         if (res.code == 0) {
            //             Toast.hide();
            //             Toast.success("保存成功", 0.5);
            //             // dispatch(addDevice())
            //             history.push('/devices');
            //         } else {
            //             Toast.hide();
            //             Toast.fail("保存失败，请稍后再试", 0.5);
            //         }
            //     })
            //     .catch(err => {
            //         Toast.hide();
            //         Toast.fail("保存失败，请稍后再试:" + JSON.stringify(err), 0.5);
            //     })
        }

    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(changeHeaderRight([
            <Button key="0" size="small" type="primary" onClick={this.save.bind(this)}>保存</Button>
        ]))
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


                return <Picker
                    className="field-item"
                    data={field.options}
                    title={field.name}
                    cascade={false}
                    extra={field.desc}

                    value={this.state.formValue[field.key]}
                    onChange={this.onChange.bind(this, field)}
                    onOk={this.onChange.bind(this, field)}
                >
                    <FieldSelector >{field.name}</FieldSelector>
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
                                {fields.map((field) => getFieldEle.bind(this)(field))}
                                <WhiteSpace size="large"/>
                            </WingBlank>

                        </List>
                    </div>
                    <div className="tab-content">
                        <List className="field-list" renderHeader={() => '编辑图片'}>
                            <div className="block-list">
                                <li>
                                    <div className="detail-block">

                                        {/*<div className="block-title">*/}
                                        {/*<span>设备图片</span>*/}
                                        {/*</div>*/}

                                        <div className="block-content">
                                            <ImagePicker
                                                files={this.state.files}
                                                onChange={this.onFileChange}
                                                onImageClick={(index, fs) => console.log(index, fs)}
                                                selectable={this.state.files.length <= 3}
                                                accept="image/gif,image/jpeg,image/jpg,image/png"
                                            />
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
    const {sidebarStatus} = state.app
    return {
        sidebarStatus
    }
}

export default connect(mapStateToProps)(DeviceEdit)