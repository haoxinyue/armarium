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
    Checkbox,
    WingBlank,
    TextareaItem,
    WhiteSpace,
    Tabs,
    ImagePicker,
    Picker,
    Switch,
    Progress
} from 'antd-mobile';
import {
    changeHeaderRight,
    completePmCaseDetail,
    getDeviceDetail,
    getPmCaseDetail,
    getPmCaseDetailByDevice
} from '../../redux/actions'

import Upload from 'rc-upload';
import moment from 'moment'
import './pmCase.less'
import api from "../../api";

const fields = [
    {key: "deviceId", name: "设备ID", desc: "请输入设备ID", type: "text"},
    {key: "deviceName", name: "设备名称", desc: "", required: false, type: "text", editable: false},
    // {key: "accessoryInfo", name: "保养文件描述", desc: "请输入保养文件描述", type: "text"},
    // {key: "remark", name: "备注", desc: "请输入备注", required: true, type: "textarea"},
];

class PmCaseEdit extends Component {

    state = {
        hasError: {},
        fileProgress: -1,

        jsonSubjects: [],
        jsonValues: {},

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

    onJsonFieldChange = (field, e) => {
        let jsonValues = this.state.jsonValues
        if (field.control_type === 'checkbox') {
            jsonValues[field.item_key] = e.target.checked
        } else {
            jsonValues[field.item_key] = e
        }


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
            actualUserId: userInfo.userId,
            actualTime: moment().format("YYYY-MM-DD HH:mm:ss"),
            // pmTemplate: JSON.stringify(this.state.jsonSubjects || []),
            pmResult: JSON.stringify(this.state.jsonValues || {})
        }

        return formData
    }

    updateDeviceById(deviceId) {
        const {dispatch} = this.props;
        dispatch(getDeviceDetail({
            deviceId: Number(deviceId)
        })).then((res) => {
            if (!res.error) {
                const {payload = {}} = res
                const {data = {}} = payload

                this.setState({
                    formValue: {
                        ...this.state.formValue,
                        deviceName: payload.data.deviceName
                    },
                });
            } else {
                this.setState({
                    formValue: {
                        ...this.state.formValue,
                        deviceName: ''
                    }
                });
            }
        }, () => {
            this.setState({
                formValue: {
                    ...this.state.formValue,
                    deviceName: ''
                }
            });
        })
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

        dispatch(completePmCaseDetail(this.getSubmitFormValue()))
            .then(res => {
                if (!res.error) {
                    Toast.hide();
                    Toast.success("保存成功", 1.2);
                    setTimeout(() => {
                        history.push(`/pmCaseList`);
                    }, 1200)

                } else {

                    let errorMessage = res.payload && res.payload.data && res.payload.data.message
                    Toast.hide();
                    Toast.fail(errorMessage || "保存失败，请稍后再试", 1.5);
                }
            })
            .catch(err => {
                Toast.hide();
                Toast.fail("保存失败，请稍后再试:" + JSON.stringify(err), 1.5);
            })

    }


    componentWillReceiveProps(nextProps, nextState) {
        const {match: {params: {deviceId}}, location: {query: {caseId}}} = this.props;
        const {pmCase: {byIds}} = nextProps;
        const {pmTemplate, pmResult} = byIds[caseId];
        const jsonSubjects = pmTemplate ? (JSON.parse(pmTemplate || '{}').subjects || []) : []
        this.setState({
            formValue: {
                ...this.state.formValue,
                caseId,
                deviceId
            },
            jsonSubjects,
            jsonValues: JSON.parse(pmResult || '{}'),
        })
        return true
    }

    componentWillUpdate() {

    }

    componentDidMount() {

        this.updateDeviceById = this.updateDeviceById.bind(this);

        const {
            dispatch, location: {
                query: {
                    caseId
                }
            }, match: {params: {deviceId}}, userInfo
        } = this.props;
        dispatch(changeHeaderRight([
            <Button key="0" size="small" type="primary" onClick={this.save.bind(this)}>保存</Button>
        ]))

        if (caseId) {
            dispatch(getPmCaseDetail({
                caseId: Number(caseId)
            }))
        }


        if (deviceId) {
            !caseId && dispatch(getPmCaseDetailByDevice({
                deviceId: Number(deviceId)
            }))
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
                // labelNumber={labelLength}
                placeholder={field.desc}
                error={this.state.hasError[field.key]}
                onErrorClick={this.onErrorClick.bind(this, field)}
                onChange={this.onChange.bind(this, field)}
                value={this.state.formValue[field.key]}
            >{field.name}</InputItem>
        }

        function getJsonFieldEle(field) {


            if (field.control_type === "checkbox") {

                return <Checkbox
                    onChange={this.onJsonFieldChange.bind(this, field)}
                    defaultChecked={this.state.jsonValues[field.item_key]}
                >
                    <span style={{marginLeft: 8, lineHeight: 1.2, verticalAlign: 'middle'}}>{field.item_name}</span>
                </Checkbox>;
            } else if (field.control_type === "textarea") {

                return <TextareaItem
                    className="field-item"
                    placeholder={field.item_name}
                    rows={5}
                    autoHeight
                    onChange={this.onJsonFieldChange.bind(this, field)}
                    value={this.state.jsonValues[field.item_key]}
                />;
            }


            return <InputItem
                className="field-item"
                onChange={this.onJsonFieldChange.bind(this, field)}
                defaultValue={this.state.jsonValues[field.item_key]}
            >{field.item_name}</InputItem>
        }

        function getFieldSubject({
                                     subject_name,
                                     items = []
                                 }) {

            return <List className="field-list" renderHeader={() => subject_name}>
                <WingBlank size="lg" style={{padding: '20px 30x'}}>
                    {
                        items.map((item, i) => <div style={{padding: '20px 0'}} key={i}>
                            {getJsonFieldEle.bind(this)(item)}
                        </div>)
                    }

                </WingBlank>
            </List>

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
            onError: (err) => {
                this.setState({
                    fileProgress: -1,
                })
                // console.log('onError', err);
            },
        }


        const subjects = this.state.jsonSubjects;


        return (
            <div className="device-edit">

                <div className="tab-content">
                    <List className="field-list" renderHeader={() => '编辑'}>
                        <WingBlank size="sm">
                            {fields.map((field, i) => <div key={i}>{getFieldEle.bind(this)(field)}</div>)}
                            <WhiteSpace size="large"/>
                        </WingBlank>
                    </List>
                    {subjects.map((field, i) => <div key={i}>{getFieldSubject.bind(this)(field)}</div>)}
                    {/* <List className="field-list" renderHeader={() => '附件上传'}>
                        <div className="block-content">
                            <WingBlank size="sm" style={{paddingTop: 30}}>

                                <div className="am-list-item am-input-item am-list-item-middle field-item">
                                    <div className="am-list-line">
                                        <div className="am-input-label am-input-label-5">附件</div>
                                        <div className="am-input-control">
                                            {this.state.formValue.pmFile && <span className="am-input-extra">
                                            <a href={this.state.formValue.pmFile}>{this.state.formValue.pmFileName || '点击下载'}</a></span>
                                            }
                                            <Upload
                                                {...uploaderProps}
                                                className={"am-flexbox am-flexbox-align-center"}
                                                component="div"
                                                style={{
                                                    display: this.state.formValue.pmFile ? 'none' : 'inline-block',
                                                }}
                                            >
                                                <Button style={{marginLeft: 40, color: 'white'}} type="primary"
                                                        size="small"
                                                        inline>{this.state.fileProgress == -2 ? '上传失败，重新上传' : '上传'}</Button>
                                            </Upload>
                                        </div>


                                    </div>
                                </div>

                                {this.state.fileProgress >= 0 &&
                                <div className="am-list-item am-input-item am-list-item-middle field-item">
                                    <div className="am-list-line">
                                        <div
                                            className="am-input-label am-input-label-5">上传中({this.state.fileProgress}%)
                                        </div>
                                        <div className="am-input-control"><Progress percent={this.state.fileProgress}
                                                                                    position="normal" unfilled={false}
                                                                                    appearTransition></Progress>
                                        </div>
                                    </div>
                                </div>
                                }


                                {getFieldEle.bind(this)({
                                    key: "accessoryInfo",
                                    name: "保养文件描述",
                                    desc: "请输入保养文件描述",
                                    type: "textarea"
                                })}
                            </WingBlank>
                        </div>
                    </List>*/}
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

export default connect(mapStateToProps)(PmCaseEdit)