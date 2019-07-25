/**
 * Created by Administrator on 2017/8/3.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import './deviceDetail.less'
import {Tabs,ImagePicker,Button,Steps} from 'antd-mobile'
import { changeHeaderRight,getRepairDetail} from '../../redux/actions'

import  moment from 'moment'

const {Step} = Steps;

class RepairDetail extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch} = this.props;
        // dispatch(changeHeaderRight([
        //     <Button key="1" size="small" type="primary"  onClick={this.onGotoEditPage.bind(this)}>编辑</Button>
        // ]))

    }

    componentWillMount() {
        const {dispatch,match:{params:{caseId}}} = this.props;
        if (caseId){
            dispatch(getRepairDetail({
                caseId:Number(caseId)
            }));
        }
    }

    componentWillReceiveProps(nextProps, nextState){
        const {dispatch,match:{params:{caseId}}} = this.props;
        const {match:{params:{caseId:NextCaseId}}} = nextProps;
        if (NextCaseId && NextCaseId!==caseId){
            dispatch(getRepairDetail({
                caseId:Number(NextCaseId)
            }));
            return true
        }
        return true

    }

    onFileChange = (files, type, index) => {
        // console.log(files, type, index);
        this.setState({
            files,
        });
    }

    onGotoEditPage(){
        const {match:{params:{caseId}}} = this.props;
        // this.props.history.push(`/deviceEdit/${deviceId}`)
    }

    render() {

        const {repair,match} = this.props;
        const { caseId} = match.params;
        const caseInfo = repair.byIds[caseId] ||{}

        const tabs = [
            {title: '资产信息', sub: '1'},
            {title: '图片', sub: '2'}
        ];

        let pictures =[];
        if (caseInfo.picture1){
            pictures.push({
                url:caseInfo.picture1,
                id:'pic1'
            })
        }
        if (caseInfo.picture2){
            pictures.push({
                url:caseInfo.picture2,
                id:'pic2'
            })
        }
        if (caseInfo.picture3){
            pictures.push({
                url:caseInfo.picture3,
                id:'pic3'
            })
        }
        if (caseInfo.picture4){
            pictures.push({
                url:caseInfo.picture4,
                id:'pic4'
            })
        }
        if (caseInfo.picture5){
            pictures.push({
                url:caseInfo.picture5,
                id:'pic5'
            })
        }

        function getTimeLineItem(data,index) {

            let statusStr ="";
            switch (data.caseState){
                case 10:
                    statusStr ="创建报修";
                    break;
                case 20:
                    statusStr ="取消报修";
                    break;
                case 30:
                    statusStr ="开始维修";
                    break;
                case 40:
                    statusStr ="完成维修";
                    break;
                case 50:
                    statusStr ="关闭工单";
                    break;
                default:
                    statusStr ="其他";
                    break;

            }

            let timeStr = moment(data.createTime).format("YYYY/MM/DD HH:mm:ss");

            statusStr += '-';
           if(data.assigneeUserName){
               statusStr += data.assigneeUserName;
               statusStr += '-';
           }

            statusStr += timeStr;

            return <Step key={index} status={'process'} description={statusStr} />
        }



        return (
            <div className="device-detail" ref={(scroll) => {
                this.scroll = scroll
            }}>
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
                    <div >
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
                                            <span className="key">报修描述</span>
                                            <span className="value">{caseInfo.caseRemark}</span>
                                        </div>


                                    </div>
                                </div>

                            </li>
                            <li>
                                <div className="detail-block">

                                    <div className="block-title">
                                        <span>进度信息</span>
                                    </div>

                                    <div className="block-content">

                                        <Steps size={"small"} status={'finish'} current={caseInfo &&  caseInfo.timeShaft&&caseInfo.timeShaft.length-1}>
                                            {
                                                caseInfo &&  caseInfo.timeShaft&&  caseInfo.timeShaft.map((item,index)=>getTimeLineItem(item,index))
                                            }
                                        </Steps>
                                    </div>
                                </div>

                            </li>
                        </ul>
                        {/*<Button type="primary" onClick={this.onGotoEditPage.bind(this)}>编辑</Button>*/}

                    </div>
                    <div>
                    <div className="block-list" style={{minHeight:'60vh'}}>
                        <li>
                            <div className="detail-block">

                                <div className="block-title">
                                    <span>工单图片</span>
                                </div>

                                <div className="block-content">
                                    {
                                        pictures.length?<ImagePicker
                                            files={pictures}
                                            onChange={this.onFileChange}
                                            onImageClick={(index, fs) => console.log(index, fs)}
                                            selectable={false}
                                            accept="image/gif,image/jpeg,image/jpg,image/png"
                                        />:<span>无</span>
                                    }

                                </div>
                            </div>

                        </li>
                    </div>
                    </div>
                </Tabs>


            </div>
        )
    }
}

const mapStateToProps = state => {
    const {repair,auth} = state;
    return {
        repair
    }
}
export default connect(mapStateToProps)(RepairDetail)