/**
 * Created by Administrator on 2017/8/3.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import './deviceDetail.less'
import {Tabs,ImagePicker,Button} from 'antd-mobile'
import { changeHeaderRight,getDeviceDetail} from '../../redux/actions'

class DeviceDetail extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(changeHeaderRight([
            <Button key="1" size="small" type="primary"  onClick={this.onGotoEditPage.bind(this)}>编辑</Button>
        ]))

    }

    componentWillMount() {
        const {dispatch,match:{params:{deviceId}}} = this.props;
        if (deviceId){
            dispatch(getDeviceDetail({
                deviceId:Number(deviceId)
            }));
        }
    }

    componentWillReceiveProps(nextProps, nextState){
        const {dispatch,match:{params:{deviceId}}} = this.props;
        const {match:{params:{deviceId:NextDeviceId}}} = nextProps;
        if (NextDeviceId && NextDeviceId!==deviceId){
            dispatch(getDeviceDetail({
                deviceId:Number(NextDeviceId)
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
        const {match:{params:{deviceId}}} = this.props;
        this.props.history.push(`/deviceEdit/${deviceId}`)
    }

    render() {

        const {device,match} = this.props;
        const { deviceId} = match.params;
        const deviceInfo = device.byIds[deviceId] ||{}

        const tabs = [
            {title: '资产信息', sub: '1'},
            {title: '图片', sub: '2'}
        ];

        let pictures =[];
        if (deviceInfo.picture1){
            pictures.push({
                url:deviceInfo.picture1,
                id:'pic1'
            })
        }
        if (deviceInfo.picture2){
            pictures.push({
                url:deviceInfo.picture2,
                id:'pic2'
            })
        }
        if (deviceInfo.picture3){
            pictures.push({
                url:deviceInfo.picture3,
                id:'pic3'
            })
        }
        if (deviceInfo.picture4){
            pictures.push({
                url:deviceInfo.picture4,
                id:'pic4'
            })
        }
        if (deviceInfo.picture5){
            pictures.push({
                url:deviceInfo.picture5,
                id:'pic5'
            })
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
                                            <span className="value">{deviceInfo.deviceId}</span>
                                        </div>
                                        <div className="content-line">
                                            <span className="key">设备编号</span>
                                            <span className="value">{deviceInfo.deviceCode}</span>
                                        </div>
                                        <div className="content-line">
                                            <span className="key">设备名称</span>
                                            <span className="value">{deviceInfo.deviceName}</span>
                                        </div>
                                        <div className="content-line">
                                            <span className="key">设备类型</span>
                                            <span className="value">{deviceInfo.deviceModel}</span>
                                        </div>
                                        <div className="content-line">
                                            <span className="key">设备描述</span>
                                            <span className="value">{deviceInfo.deviceDesc}</span>
                                        </div>


                                    </div>
                                </div>

                            </li>
                            <li>
                                <div className="detail-block">

                                    <div className="block-title">
                                        <span>其他信息</span>
                                    </div>

                                    <div className="block-content">

                                        <div className="content-line">
                                            <span className="key">所属医院</span>
                                            <span className="value">{deviceInfo.hospital}</span>
                                        </div>
                                        <div className="content-line">
                                            <span className="key">所属部门</span>
                                            <span className="value">{deviceInfo.department}</span>
                                        </div>

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
                                    <span>设备图片</span>
                                </div>

                                <div className="block-content">
                                    {
                                        pictures.length?<ImagePicker
                                            files={pictures}
                                            onChange={this.onFileChange}
                                            onImageClick={(index, fs) => console.log(index, fs)}
                                            selectable={false}
                                            accept="image/gif,image/jpeg,image/jpg,image/png"
                                        />:<span>暂无</span>
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
    const {device} = state;
    return {
        device
    }
}
export default connect(mapStateToProps)(DeviceDetail)