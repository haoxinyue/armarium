/**
 * Created by Administrator on 2017/8/3.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    List,
    Button,
    InputItem,
    TextareaItem,
    Toast,
    WingBlank,
    WhiteSpace,
    Tabs,
    ImagePicker,
    Picker,
    Switch
} from 'antd-mobile';

import ImageUploadField from '../../components/ImageUploadField';

import {changeHeaderRight, addRepair} from '../../redux/actions'

import './repairAdd.less'
import api from "../../api";

const fields = [
    // {key: "deviceId", name: "设备ID", desc: "请输入设备ID", type: "text"},
    {key: "deviceId", name: "设备", desc: "请输入设备ID", required: true, type: "text"},
    {key: "reporterName", name: "报修人", desc: "请输入报修人姓名", required: true, type: "text"},
    {key: "reporterCompany", name: "报修单位", desc: "请输入报修单位名称", required: true, type: "text"},
    {key: "reporterMobile", name: "报修手机", desc: "请输入报修手机", required: true, type: "text"},
    {key: "caseRemark", name: "备注", desc: "请输入备注信息", required: false, type: "textArea"},

];

class RepairAdd extends Component {

    state = {
        hasError: {},
        value: '',

        files: [],

        formValue: {
            deviceId: '',//设备ID
            caseRemark: '',
            caseFilePath: '',
            creater: 0,
            modifier: 0,
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
        const {userInfo} = this.props;
        let currentUserId = userInfo.userId
        return {
            ...this.state.formValue,
            reporterMobile: this.state.formValue.reporterMobile,//.replace(/\s/g,""),
            reporterUserId: currentUserId,
            creater: currentUserId,
            modifier: currentUserId
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

        if (this.state.formValue.deviceId) {

            dispatch(addRepair(this.getSubmitFormValue()))
                .then(res => {
                    if (res.error) {
                        Toast.hide();
                        Toast.fail("保存失败，请稍后再试", 0.5);
                        return
                    }
                    Toast.hide();
                    Toast.success("保修成功", 1);
                    history.push('/repairs');
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
            this.setState({
                formValue: {
                    deviceId: NextDeviceId
                }
            })
        }


        return true
    }

    componentWillUpdate() {

    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(changeHeaderRight([
            <Button key="0" size="small" type="primary" onClick={this.save.bind(this)}>保存</Button>
        ]))

        let deviceId = this.props.location.query && this.props.location.query.deviceId;
        if (deviceId) {
            this.setState({
                formValue: {
                    deviceId
                }
            })
        }

        // alert(this.props.location.query.deviceId);
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
            } else if (field.type === "textArea") {
                return <TextareaItem
                    className="field-item"
                    type={field.type}
                    rows={3}
                    // labelNumber={labelLength}
                    placeholder={field.desc}
                    error={this.state.hasError[field.key]}
                    onErrorClick={this.onErrorClick.bind(this, field)}
                    onChange={this.onChange.bind(this, field)}
                    value={this.state.formValue[field.key]}
                >{field.name}</TextareaItem>
            }


            return <InputItem
                className="field-item"
                type={field.type}
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
            },
            onSuccess: (res) => {

            },
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
                        <List className="field-list" renderHeader={() => '添加图片'}>
                            <div className="block-list">
                                <li>
                                    <div className="detail-block">

                                        <div className="block-content">
                                            <ImageUploadField fieldName={"caseFilePath"}
                                                              value={this.state.formValue.caseFilePath}
                                                              onChange={(val) => {
                                                                  console.log("new caseFilePath: "+val)
                                                                  this.setState({
                                                                      formValue: {
                                                                          ...this.state.formValue,
                                                                          caseFilePath: val
                                                                      }
                                                                  })
                                                              }}></ImageUploadField>
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

export default connect(mapStateToProps)(RepairAdd)