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

import {changeHeaderRight, updateRepair, getRepairDetail} from '../../redux/actions'

import './repairAdd.less'

const fields = [

    {
        key: "priority", name: "重要程度", desc: "请选择", required: true, type: "text", options:
            [[
                {
                    label: '一般',
                    value: 1,
                },
                {
                    label: '重要',
                    value: 2,
                },
                {
                    label: '紧急',
                    value: 3,
                }
            ]
            ]
    },
    {
        key: "caseState", name: "工单状态", desc: "请选择", required: true, type: "text", options:
            [[
                {
                    label: '待处理',
                    value: 10,
                },
                {
                    label: '已取消',
                    value: 20,
                },
                {
                    label: '处理中',
                    value: 30,
                },
                {
                    label: '已完成',
                    value: 40,
                },
                // {
                //     label: '已关闭',
                //     value: 50,
                // }
            ]
            ]
    },

    {key: "cost", name: "工单成本", desc: "请输入工单成本（元）", required: false, type: "text"},

    {key: "caseRemark", name: "工单描述", desc: "请输入处理备注", required: false, type: "textArea"},


];

class RepairEdit extends Component {

    state = {
        hasError: {},
        value: '',

        files: [],

        formValue: {
            deviceId: '',//设备ID
            reportProblem: '',
            caseFilePath: '',
            priority: [1],
            creater: 0,
            modifier: 0,
        }
    }

    onErrorClick = (field) => {
        Toast.info('请输入正确的[' + field.name + ']');
    }

    onChange = (field, value) => {
        let formValue = this.state.formValue

        formValue[field.key] = value


        this.setState({
            formValue
        });


    }


    getSubmitFormValue() {
        const {repair, match: {params: {caseId}},userInfo} = this.props;
        const caseInfo = (caseId && repair.byIds[caseId])||{};
        let currentUserId = userInfo.userId
        return {
            ...caseInfo,
            ...this.state.formValue,
            priority:this.state.formValue.priority[0],
            caseState:this.state.formValue.caseState[0],
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

        let caseValue = this.getSubmitFormValue()
        dispatch(updateRepair(caseValue))
            .then(res => {
                if (res.error) {
                    Toast.hide();
                    Toast.fail("保存失败，请稍后再试", 0.5);
                    return
                }
                Toast.hide();
                Toast.success("保修成功", 1);
                history.replace('/repairDetail/'+caseValue.caseId);
            })
            .catch(err => {
                Toast.hide();
                Toast.fail("保存失败，请稍后再试", 0.5);
            })

    }


    componentWillMount() {
        const {dispatch, match: {params: {caseId}}} = this.props;
        if (caseId) {
            dispatch(getRepairDetail({
                caseId: Number(caseId)
            }));
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        const {dispatch, match: {params: {caseId}}} = this.props;
        const {match: {params: {caseId: NextCaseId}}, repair} = nextProps;

        if (NextCaseId && NextCaseId !== caseId) {
            dispatch(getRepairDetail({
                caseId: Number(NextCaseId)
            }));
            return true
        } else if (NextCaseId) {
            const caseInfo = repair.byIds[NextCaseId];
            if (caseInfo) {
                const formValue = {
                    caseRemark: caseInfo.caseRemark,
                    caseState: caseInfo.caseState ? [caseInfo.caseState] : [],
                    cost: caseInfo.cost,
                    priority: caseInfo.priority ? [caseInfo.priority] : [],
                    caseFilePath:caseInfo.caseFilePath
                }
                this.setState({
                    formValue
                })
            }

        }
        return true

    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(changeHeaderRight([
            <Button key="0" size="small" type="primary" onClick={this.save.bind(this)}>保存</Button>
        ]));

    }

    render() {
        const {repair, match: {params: {caseId}}} = this.props;
        const caseInfo = (caseId && repair.byIds[caseId])||{};
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
                editable={field.editable}
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
                                <ul className="block-list">
                                    <li>
                                        <div className="detail-block">

                                            <div className="block-title">
                                                <span>基本信息</span>
                                            </div>

                                            <div className="block-content">

                                                <div className="content-line">
                                                    <span className="key">设备ID</span>
                                                    <span className="value">{caseInfo.deviceId}</span>
                                                </div>
                                                <div className="content-line">
                                                    <span className="key">设备名称</span>
                                                    <span className="value">{caseInfo.deviceName}</span>
                                                </div>
                                                <div className="content-line">
                                                    <span className="key">所属医院</span>
                                                    <span className="value">{caseInfo.hospital}</span>
                                                </div>
                                                <div className="content-line">
                                                    <span className="key">所属部门</span>
                                                    <span className="value">{caseInfo.deptName}</span>
                                                </div>

                                                <div className="content-line">
                                                    <span className="key">报修人</span>
                                                    <span className="value">{caseInfo.reporterUserName}</span>
                                                </div>
                                                <div className="content-line">
                                                    <span className="key">报修问题</span>
                                                    <span className="value">{caseInfo.reportProblem}</span>
                                                </div>


                                            </div>
                                        </div>

                                    </li>
                                </ul>
                            </WingBlank>
                            <WingBlank size="sm">
                                {fields.map((field, i) => <div key={i}>{getFieldEle.bind(this)(field)}</div>)}
                                <WhiteSpace size="large"/>
                            </WingBlank>

                        </List>
                    </div>
                    <div className="tab-content">
                        <List className="field-list" renderHeader={() => '图片'}>
                            <div className="block-list">
                                <li>
                                    <div className="detail-block">

                                        <div className="block-content">
                                            <ImageUploadField
                                                editable={false}
                                                fieldName={"caseFilePath"}
                                                value={this.state.formValue.caseFilePath}
                                                onChange={(val) => {
                                                    console.log("new caseFilePath: " + val)
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
    const {repair, auth} = state;

    const {userInfo} = auth;

    return {
        device: state.device,
        repair,
        userInfo
    }
}

export default connect(mapStateToProps)(RepairEdit)