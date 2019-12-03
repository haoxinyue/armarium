/**
 * Created by Administrator on 2017/8/3.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import './installCase.less'
import {Tabs, ImagePicker, Button, Modal ,Toast} from 'antd-mobile'
import {changeHeaderRight, getInstallCaseDetail,updateInstallCase} from '../../redux/actions'


class InstallcaseDetail extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    componentWillMount() {
        const {dispatch, match: {params: {caseId}}} = this.props;
        if (caseId) {
            dispatch(getInstallCaseDetail({
                caseId: Number(caseId)
            }));
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        const {dispatch, match: {params: {caseId}}} = this.props;
        const {match: {params: {caseId: NextCaseId}}, userInfo = {}, installCase} = nextProps;

        if (NextCaseId && NextCaseId !== caseId) {
            dispatch(getInstallCaseDetail({
                caseId: Number(NextCaseId)
            }));
        }
        const {userId, roleName} = userInfo;
        const caseInfo = installCase.byIds[NextCaseId]

        if (caseInfo) {
            if (caseInfo.reporterUserId === userId && ["科室工作人员", "科室负责人"].includes(roleName)) {
                dispatch(changeHeaderRight([
                    <Button key="1" size="small" type="primary" onClick={this.checkCase.bind(this)}>审核</Button>
                ]))
            } else if (["运维工程师", "运维管理员"].includes(roleName)) {
                dispatch(changeHeaderRight([
                    <Button key="1" size="small" type="primary" onClick={this.onGotoEditPage.bind(this)}>编辑</Button>
                ]))
            } else {
                dispatch(changeHeaderRight([]))
            }
        }

    }


    onGotoEditPage() {
        const {match: {params: {caseId}}} = this.props;
        this.props.history.push(`/installCaseEdit/${caseId}`)
    }

    checkCase() {
        const {dispatch , installCase, match ,userInfo} = this.props;
        const {caseId} = match.params;

        let doCheck = (pass) => {
            dispatch(getInstallCaseDetail({
                caseId: Number(caseId),
                confirmUserId:userInfo.userId,
                modifier:userInfo.userId,
                caseState:pass?50:10
            })).then((res)=>{
                if (res.error) {
                    Toast.info("审核失败", 1);
                }else{
                    Toast.info("审核成功", 1);
                    setTimeout(()=>{
                        this.props.history.push(`/installCaseList`)
                    },1000)
                }
            });
        };

        let ops = [
            {
                text: '通过', onPress: () => {
                    doCheck(true)
                }
            }, {
                text: '不通过', onPress: () => {
                    doCheck(false)
                }
            }, {
                text: '再想想', onPress: () => {
                }
            }
        ];
        Modal.operation(ops);
    }

    render() {

        const {installCase, match} = this.props;
        const {caseId} = match.params;
        const caseInfo = installCase.byIds[caseId] || {}

        const tabs = [
            {title: '设备信息', sub: '1'},
            {title: '图片', sub: '2'},
        ];

        let pictures = [];
        if (caseInfo.picture1) {
            pictures.push({
                url: caseInfo.picture1,
                id: 'pic1'
            })
        }
        if (caseInfo.picture2) {
            pictures.push({
                url: caseInfo.picture2,
                id: 'pic2'
            })
        }
        if (caseInfo.picture3) {
            pictures.push({
                url: caseInfo.picture3,
                id: 'pic3'
            })
        }
        if (caseInfo.picture4) {
            pictures.push({
                url: caseInfo.picture4,
                id: 'pic4'
            })
        }
        if (caseInfo.picture5) {
            pictures.push({
                url: caseInfo.picture5,
                id: 'pic5'
            })
        }


        return (
            <div className="install-case-detail" ref={(scroll) => {
                this.scroll = scroll
            }}>
                <Tabs
                    tabs={tabs}
                    className="detail-tab"
                    initialPage={0}
                    renderTab={tab => <span>{tab.title}</span>}
                >
                    <div>
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
                                            <span className="key">设备编号</span>
                                            <span className="value">{caseInfo.deviceCode}</span>
                                        </div>
                                        <div className="content-line">
                                            <span className="key">设备名称</span>
                                            <span className="value">{caseInfo.deviceName}</span>
                                        </div>
                                        <div className="content-line">
                                            <span className="key">设备型号</span>
                                            <span className="value">{caseInfo.deviceModel}</span>
                                        </div>
                                        <div className="content-line">
                                            <span className="key">设备描述</span>
                                            <span className="value">{caseInfo.deviceDesc}</span>
                                        </div>
                                        <div className="content-line">
                                            <span className="key">资产编号</span>
                                            <span className="value">{caseInfo.assetNo}</span>
                                        </div>
                                        <div className="content-line">
                                            <span className="key">设备序列号</span>
                                            <span className="value">{caseInfo.serialNumber}</span>
                                        </div>
                                        <div className="content-line">
                                            <span className="key">设备厂家</span>
                                            <span className="value">{caseInfo.manufacturer}</span>
                                        </div>
                                        <div className="content-line">
                                            <span className="key">设备产地</span>
                                            <span className="value">{caseInfo.producingPlace}</span>
                                        </div>


                                    </div>
                                </div>

                            </li>
                        </ul>

                    </div>
                    <div className="block-list" style={{minHeight: '60vh'}}>
                        <li>
                            <div className="detail-block">

                                <div className="block-title">
                                    <span>设备图片</span>
                                </div>

                                <div className="block-content">
                                    {
                                        pictures.length ? <ImagePicker
                                            files={pictures}
                                            onImageClick={(index, fs) => console.log(index, fs)}
                                            selectable={false}
                                            accept="image/gif,image/jpeg,image/jpg,image/png"
                                        /> : <span>暂无</span>
                                    }

                                </div>
                            </div>

                        </li>
                    </div>
                </Tabs>


            </div>
        )
    }
}

const mapStateToProps = state => {
    const {installCase, auth} = state;
    return {
        installCase,
        userInfo: auth.userInfo
    }
}
export default connect(mapStateToProps)(InstallcaseDetail)