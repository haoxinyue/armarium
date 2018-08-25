/**
 * Created by Administrator on 2017/8/3.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Button, InputItem, Toast, WingBlank,TextareaItem, WhiteSpace, Tabs, ImagePicker, Picker, Switch} from 'antd-mobile';
import {changeHeaderRight, completeInspectionCaseDetail, getInspectionCaseDetail} from '../../redux/actions'

import Upload from 'rc-upload';
import moment from 'moment'
import './inspectionCase.less'
import api from "../../api";

const fields = [
    {key: "deviceId", name: "设备ID", desc: "请输入设备ID", type: "text"},

    // {
    //     key: "inspectionType", name: "巡检类型", desc: "请设置巡检类型", required: true, type: "text", options: [
    //         [
    //             {
    //                 label: '巡检',
    //                 value: 1,
    //             },
    //             {
    //                 label: '强检',
    //                 value: 2,
    //             }
    //         ]
    //     ]
    // },

    {
        key: "deviceOnState", name: "开机状态", desc: "请设置开机状态", required: true, type: "text", options: [
            [
                {
                    label: '正常',
                    value: 1,
                },
                {
                    label: '不正常',
                    value: 2,
                }
            ]
        ]
    },{
        key: "deviceElecEvnState", name: "电气环境", desc: "请设置电气环境", required: true, type: "text", options: [
            [
                {
                    label: '正常',
                    value: 1,
                },
                {
                    label: '不正常',
                    value: 2,
                }
            ]
        ]
    },{
        key: "deviceFuncState", name: "功能状态", desc: "请设置功能状态", required: true, type: "text", options: [
            [
                {
                    label: '正常',
                    value: 1,
                },
                {
                    label: '不正常',
                    value: 2,
                }
            ]
        ]
    },{
        key: "deviceEnvState", name: "设备环境", desc: "请设置设备环境", required: true, type: "text", options: [
            [
                {
                    label: '正常',
                    value: 1,
                },
                {
                    label: '不正常',
                    value: 2,
                }
            ]
        ]
    },
    {key: "deviceParamInput", name: "设备参数", desc: "请输入设备参数", type: "text"},
    {key: "inspectionRemark", name: "巡检结论", desc: "请输入巡检结论", required: true, type: "textarea"},
    /*{
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
    }*/
];

class InspectionCaseEdit extends Component {

    state = {
        hasError: {},
        value: '',

        imageFiles: [],

        formValue: {
            deviceId: '',//设备ID
            // inspectionType: [1],//巡检类型
            inspectionRemark: '',//巡检结论
            deviceOnState:[1],
            deviceElecEvnState:[1],
            deviceFuncState:[1],
            deviceEnvState:[1],
            deviceParamInput:'',
            inspectionTime:moment().format("YYYY/MM/DD HH:mm:ss"),
            assigneeUserId: 0,
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

    getSubmitFormValue() {

        let formData = {
            ...this.state.formValue,
            deviceOnState: this.state.formValue.deviceOnState[0],
            deviceElecEvnState: this.state.formValue.deviceElecEvnState[0],
            deviceFuncState: this.state.formValue.deviceFuncState[0],
            deviceEnvState: this.state.formValue.deviceEnvState[0],
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

        dispatch(completeInspectionCaseDetail(this.getSubmitFormValue()))
            .then(res => {
                console.log(res)
                if (res.payload.code == 0) {
                    Toast.hide();
                    Toast.success("保存成功", 0.5);
                    history.push(`/inspectionCaseList`);
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
        const {dispatch, match: {params: {caseId}}, inspectionCase, userInfo} = this.props;
        const {match: {params: {caseId: NextCaseId}}} = nextProps;
        if (NextCaseId && NextCaseId !== caseId) {
            console.log("ReceiveProps----");
            dispatch(getInspectionCaseDetail({
                caseId: Number(NextCaseId)
            }))
            return false
        }

        let info = caseId && inspectionCase.byIds[caseId];
        if (info) {
            console.log("update----");
            let formValue = {
                assigneeUserId: userInfo.userId,
                creater: userInfo.userId,
                modifier: userInfo.userId,
            }
            for (let k in this.state.formValue) {
                if (info[k] != null) {
                    if (k === "inspectionTime") {
                        formValue[k] = moment(info[k])
                    } else if (["inspectionType"].indexOf(k) !== -1) {
                        formValue[k] = [info[k]]
                    } else {
                        formValue[k] = info[k]
                    }
                }
            }


            this.setState({
                formValue
            })
        } else {
            let formValue = {
                assigneeUserId: userInfo.userId,
                creater: userInfo.userId,
                modifier: userInfo.userId,
            };

            this.setState({
                formValue
            })
        }
        return true
    }

    componentWillUpdate() {

    }

    componentDidMount() {
        const {dispatch, match: {params: {deviceId}},caseId,userInfo} = this.props;
        dispatch(changeHeaderRight([
            <Button key="0" size="small" type="primary" onClick={this.save.bind(this)}>保存</Button>
        ]))

        if (caseId) {
            console.log("mount----")
            dispatch(getInspectionCaseDetail({
                caseId: Number(caseId)
            }))
        }

        if(deviceId){
            this.setState({
                formValue:{
                    ...this.state.formValue,
                    assigneeUserId: userInfo.userId,
                    creater: userInfo.userId,
                    modifier: userInfo.userId,
                    deviceId:deviceId
                }
            })

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

            if(field.type ==="textarea"){

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
        inspectionCase: state.inspectionCase,
        userInfo
    }
}

export default connect(mapStateToProps)(InspectionCaseEdit)