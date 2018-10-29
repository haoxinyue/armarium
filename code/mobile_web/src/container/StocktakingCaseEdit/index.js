/**
 * Created by Administrator on 2017/8/3.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    List,
    Button,
    InputItem,
    Toast,
    WingBlank,
    TextareaItem,
    WhiteSpace,
    Tabs,
    ImagePicker,
    Picker,
    Switch,
    Progress
} from 'antd-mobile';
import {changeHeaderRight, completeStocktakingCase, getDeviceDetail} from '../../redux/actions'

import Upload from 'rc-upload';
import moment from 'moment'
import './pmCase.less'
import api from "../../api";

const fields = [
    {key: "deviceId", name: "设备ID", desc: "请输入设备ID", type: "text"},
    {key: "deviceName", name: "设备名称", desc: "", required: false, type: "text", editable: false},
    // {key: "accessoryInfo", name: "保养文件描述", desc: "请输入保养文件描述", type: "text"},
    {key: "remark", name: "备注", desc: "请输入备注", required: true, type: "textarea"},
];

class StocktakingCaseEdit extends Component {

    state = {
        hasError: {},
        fileProgress: -1,

        formValue: {
            deviceId: '',//设备ID

            accessoryInfo: '',
            pmFile: '',
            remark: '',

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

        if (field.key === "deviceId" && value) {
            clearTimeout(this._lastDeviceUpdate);
            this._lastDeviceUpdate = setTimeout(() => {
                this.updateDeviceById(value);
            }, 600)
        }
    }

    getSubmitFormValue() {

        const {userInfo} = this.props;

        let formData = {
            ...this.state.formValue,
            creater: userInfo.userId,
            modifier: userInfo.userId,
            operationUserId: userInfo.userId,
            operationTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        }

        return formData
    }

    save() {
        const {dispatch, history} = this.props;

        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            if (field.required && !this.state.formValue[field.key]) {
                Toast.info(field.desc, 1);
                return
            }
        }

        dispatch(completeStocktakingCase(this.getSubmitFormValue()))
            .then(res => {
                if (!res.error) {
                    Toast.hide();
                    Toast.success("保存成功", 0.5);
                    history.replace(`/stocktakingCase`);
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


    componentWillReceiveProps(nextProps, nextState) {
        const { match: {params: {deviceId}}} = this.props;

            this.setState({
                formValue:{
                    ...this.state.formValue,
                    deviceId
                }
            })


        return true
    }

    componentWillUpdate() {

    }

    updateDeviceById(deviceId) {
        const {dispatch} = this.props;
        dispatch(getDeviceDetail({
            deviceId: Number(deviceId)
        })).then((res) => {
            if (!res.error) {
                this.setState({
                    formValue: {
                        ...this.state.formValue,
                        deviceName: res.payload.data.deviceName
                    }
                });
            }else{
                this.setState({
                    formValue: {
                        ...this.state.formValue,
                        deviceName: ''
                    }
                });
            }
        },()=>{
            this.setState({
                formValue: {
                    ...this.state.formValue,
                    deviceName: ''
                }
            });
        })
    }

    componentDidMount() {

        this.updateDeviceById = this.updateDeviceById.bind(this);

        const {dispatch, match: {params: {deviceId}}, caseId, userInfo} = this.props;
        dispatch(changeHeaderRight([
            <Button key="0" size="small" type="primary" onClick={this.save.bind(this)}>保存</Button>
        ]))


        if (deviceId) {
            this.setState({
                formValue: {
                    ...this.state.formValue,
                    creater: userInfo.userId,
                    modifier: userInfo.userId,
                    deviceId: deviceId
                }
            })

            this.updateDeviceById(deviceId)

        }
    }


    render() {


        const FieldSelector = props => (
            <div className="am-list-item am-input-item am-list-item-middle field-item" onClick={props.onClick}>
                <div className="am-list-line">
                    <div className="am-input-label am-input-label-5">{props.children}</div>
                    <div className="am-input-control"><span className="am-input-extra">{props.extra}</span></div>
                </div>
            </div>
        );


        function getFieldEle(field) {

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
                    editable={field.editable}
                    value={value}
                    onChange={this.onChange.bind(this, field)}
                    onOk={this.onChange.bind(this, field)}
                >
                    <FieldSelector>{field.name}</FieldSelector>
                </Picker>
            }

            if (field.type === "textarea") {

                return <TextareaItem
                    className="field-item"
                    type={field.text}
                    editable={field.editable}
                    // labelNumber={labelLength}
                    placeholder={field.desc}
                    rows={5}
                    autoHeight
                    error={this.state.hasError[field.key]}
                    onErrorClick={this.onErrorClick.bind(this, field)}
                    onChange={this.onChange.bind(this, field)}
                    value={this.state.formValue[field.key]}
                >{field.name}</TextareaItem>;
            }


            return <InputItem
                className="field-item"
                type={field.text}
                editable={field.editable}
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
            name: 'fileUpload',
            multiple: false,
            onSuccess: (res, file) => {
                // console.log('onSuccess', res);
                this.setState({
                    fileProgress: -1,
                    formValue: {
                        ...this.state.formValue,
                        pmFile: res.data,
                        pmFileName: file.name
                    }
                })

            },
            onStart: (file) => {
                this.setState({
                    fileProgress: 0,
                })
            },
            onProgress: (step, file) => {
                let fileProgress = Math.round(step.percent);
                this.setState({
                    fileProgress
                })
                // console.log('onProgress', Math.round(step.percent), file.name);
            },
            onError:(err)=> {
                this.setState({
                    fileProgress: -1,
                })
                // console.log('onError', err);
            },
        }

        return (
            <div className="device-edit">

                <div className="tab-content">
                    <List className="field-list" renderHeader={() => '编辑'}>
                        <WingBlank size="sm">
                            {fields.map((field, i) => <div key={i}>{getFieldEle.bind(this)(field)}</div>)}
                            <WhiteSpace size="large"/>
                        </WingBlank>

                    </List>
                </div>


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {sidebarStatus} = state.app;
    const {userInfo} = state.auth;

    return {
        sidebarStatus,
        pmCase: state.pmCase,
        userInfo
    }
}

export default connect(mapStateToProps)(StocktakingCaseEdit)