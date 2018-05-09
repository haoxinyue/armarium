/**
 * Created by Administrator on 2017/8/3.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import './deviceDetail.less'
import {Tabs,ImagePicker,Button} from 'antd-mobile'
import { changeHeaderRight} from '../../redux/actions'

class DeviceDetail extends Component {
    constructor(props) {
        super(props)
        const data = [{
            url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
            id: '2121',
        }, {
            url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
            id: '2122',
        }];
        this.state = {
            showData: [],
            files:data
        }
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(changeHeaderRight([
            <Button key="1" size="small" type="primary"  onClick={this.onGotoEditPage.bind(this)}>编辑</Button>
        ]))

    }

    componentDidUpdate() {
        // scroll.refresh()
    }

    componentWillUnmount() {
    }

    onFileChange = (files, type, index) => {
        // console.log(files, type, index);
        this.setState({
            files,
        });
    }

    onGotoEditPage(){
        let id = 1
        this.props.history.push(`/deviceEdit/${id}`)
    }

    render() {
        const tabs = [
            {title: '资产信息', sub: '1'},
            {title: '图片', sub: '2'}
        ];

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
                                            <span className="key">资产名称</span>
                                            <span className="value">靶控注射泵</span>
                                        </div>
                                        <div className="content-line">
                                            <span className="key">资产型号</span>
                                            <span className="value">CP-600TCI</span>
                                        </div>
                                        <div className="content-line">
                                            <span className="key">资产编号</span>
                                            <span className="value">20180808271182</span>
                                        </div>
                                        <div className="content-line">
                                            <span className="key">所在院区</span>
                                            <span className="value">南山医院</span>
                                        </div>
                                        <div className="content-line">
                                            <span className="key">所属科室</span>
                                            <span className="value">麻醉科</span>
                                        </div>

                                        <div className="content-line">
                                            <span className="key">序列号</span>
                                            <span className="value">907006</span>
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
                                            <span className="key">资产名称</span>
                                            <span className="value">靶控注射泵</span>
                                        </div>
                                        <div className="content-line">
                                            <span className="key">备注</span>
                                            <span className="value">无</span>
                                        </div>

                                    </div>
                                </div>

                            </li>
                        </ul>
                        {/*<Button type="primary" onClick={this.onGotoEditPage.bind(this)}>编辑</Button>*/}

                    </div>
                    <div>
                    <div className="block-list">
                        <li>
                            <div className="detail-block">

                                <div className="block-title">
                                    <span>设备图片</span>
                                </div>

                                <div className="block-content">
                                    <ImagePicker
                                        files={this.state.files}
                                        onChange={this.onFileChange}
                                        onImageClick={(index, fs) => console.log(index, fs)}
                                        selectable={false}
                                        accept="image/gif,image/jpeg,image/jpg,image/png"
                                    />
                                </div>
                            </div>
                            <div className="detail-block">

                                <div className="block-title">
                                    <span>铭牌图片</span>
                                </div>

                                <div className="block-content">
                                    <ImagePicker
                                        files={this.state.files}
                                        onChange={this.onFileChange}
                                        onImageClick={(index, fs) => console.log(index, fs)}
                                        selectable={false}
                                        accept="image/gif,image/jpeg,image/jpg,image/png"
                                    />
                                </div>
                            </div>
                            <div className="detail-block">

                                <div className="block-title">
                                    <span>标签图片</span>
                                </div>

                                <div className="block-content">
                                    {/*<ImagePicker
                                        files={[]}

                                        onChange={this.onFileChange}
                                        onImageClick={(index, fs) => console.log(index, fs)}
                                        selectable={false}
                                        accept="image/gif,image/jpeg,image/jpg,image/png"
                                    />*/}
                                    <div className="block-line">
                                        <div className="key">暂无</div>
                                    </div>
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
    const {metaData, listData} = state.app
    return {
        metaData,
        listData
    }
}
export default connect(mapStateToProps)(DeviceDetail)