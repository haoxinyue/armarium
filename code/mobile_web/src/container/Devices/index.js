/**
 * Created by Administrator on 2017/8/3.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    changeHeaderRight
} from '../../redux/actions'
import {PullToRefresh, ListView, SearchBar, Drawer, Toast, Modal} from 'antd-mobile'
import RadioGroup from '../../components/RadioGroup'
import DeviceListItem from '../../components/DeviceListItem'
import {getQueryString} from '../../utils'
import axios from '../../http'
import api from '../../api'
import './deviceList.less'


class Customer extends Component {
    constructor(props) {
        super(props)

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight - 88 - 90,
            useBodyScroll: false,

            openFilter: false,


            searchValue: '',


        }
    }


    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(changeHeaderRight([
            <div key="0" className="filter-btn" onClick={this.onOpenChange}>
                <i className="filter-bg"></i>
                <span>筛选</span>
            </div>
        ]))

        this.onRefresh()
    }

    componentWillUnmount() {

    }

    /**
     * 搜索text
     * @param searchValue
     */
    handleChange = (searchValue) => {
        this.setState({
            searchValue
        })
    }

    onOpenChange = (...args) => {

        this.setState({openFilter: !this.state.openFilter});
    }

    /**
     * 调用搜索按钮
     */
    handleSubmit = () => {
        this.onRefresh()
    }


    onRefresh = () => {
        this.setState({refreshing: true, isLoading: true});
        // simulate initial Ajax
        axios.http.post(api.deviceListGet,{pageIndex:1}).then((res)=>{
            // Toast.info("success")
            // setTimeout(()=>{
            //     Toast.fail(JSON.stringify(res))
            // },1000)
            Toast.hide()
        },(res)=>{
            // Toast.fail("failed")
            // setTimeout(()=>{
            //     Toast.fail(JSON.stringify(res))
            // },1000)
            Toast.hide()

        })

        setTimeout(() => {
            this.rData = [{
                DeviceId: "1",
                DeviceCode: "001",
                DeviceName: "电脑中频治疗仪",
                DeviceModel: "CP-600TCI",
                SerialNumber: "20170808111122",
                QRCode: "00000000001",
                DeviceState: "1"
            }, {
                DeviceId: "2",
                DeviceCode: "002",
                DeviceName: "电脑中频治疗仪2",
                DeviceModel: "CP-600TCI",
                SerialNumber: "20170808111222",
                QRCode: "00000000002",
                DeviceState: "2"
            }, {
                DeviceId: "3",
                DeviceCode: "003",
                DeviceName: "电脑中频治疗仪3",
                DeviceModel: "CP-600TCI",
                SerialNumber: "20170808111222",
                QRCode: "00000000002",
                DeviceState: "2"
            }, {
                DeviceId: "4",
                DeviceCode: "004",
                DeviceName: "电脑中频治疗仪4",
                DeviceModel: "CP-600TCI",
                SerialNumber: "20170808111222",
                QRCode: "00000000002",
                DeviceState: "2"
            }, {
                DeviceId: "5",
                DeviceCode: "005",
                DeviceName: "电脑中频治疗仪5",
                DeviceModel: "CP-600TCI",
                SerialNumber: "20170808111222",
                QRCode: "00000000002",
                DeviceState: "2"
            }
            ];
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                refreshing: false,
                isLoading: false,
            });
        }, 600);

    };

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        // console.log('reach end', event);
        this.setState({isLoading: true});

        setTimeout(() => {

            this.rData = [...this.rData, ...[{
                DeviceId: "1",
                DeviceCode: "001",
                DeviceName: "电脑中频治疗仪",
                DeviceModel: "CP-600TCI",
                SerialNumber: "20170808111122",
                QRCode: "00000000001",
                DeviceState: "1"
            }, {
                DeviceId: "2",
                DeviceCode: "002",
                DeviceName: "电脑中频治疗仪2",
                DeviceModel: "CP-600TCI",
                SerialNumber: "20170808111222",
                QRCode: "00000000002",
                DeviceState: "2"
            },
            ]];
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 1000);
    };

    render() {
        const display = this.state.openFilter ? 'block' : 'none'
        // 参会状态props
        const partProps = {
            name: 'part',
            defaultValue: '所有',
            data: ['所有', '正常', '故障'],
            onChange: () => {
                this.setState({
                    openFilter:false
                })
                this.onRefresh()

            }
        }

        // 客户类型props
        const customerProps = {
            name: 'customer',
            defaultValue: '所有',
            data: ['所有', '新客户', '老客户'],
            onChange: () => {
            }
        }


        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );

        const sidebar =
            <div className="side-content">
                <ul className="filter-list">
                    <li className="filter-list-item">
                        <h6 className="filter-list-item-title">设备状态</h6>
                        <RadioGroup {...partProps} />
                    </li>
                    {/*<li className="filter-list-item">*/}
                        {/*<h6 className="filter-list-item-title">客户类型</h6>*/}
                        {/*<RadioGroup {...customerProps} />*/}
                    {/*</li>*/}
                </ul>
            </div>

        return (
            <Drawer
                className="device-list"
                enableDragHandle
                contentStyle={{}}
                sidebar={sidebar}
                position="right"
                open={this.state.openFilter}
                onOpenChange={this.onOpenChange}
            >

                <section className="dataList-wrap">

                    <SearchBar className="search-box" placeholder="请输入设备名称" value={this.state.searchValue}
                               onChange={this.handleChange}
                               onSubmit={this.handleSubmit}/>
                    <div className="dataList-container" id="J_Scroll">
                        <div className="scroll-hook">
                            <ListView
                                className="dataList-list"
                                key={ '0'}
                                ref={el => this.lv = el}
                                dataSource={this.state.dataSource}

                                renderRow={(rowData, sectionID, rowID) => (
                                    <DeviceListItem key={sectionID + '_' + rowID}
                                                    history={this.props.history}
                                                    list={rowData}
                                    />
                                )}
                                renderFooter={() => (<div style={{padding: 30, textAlign: 'center'}}>
                                    {this.state.isLoading ? '加载中...' : '已加载'}
                                </div>)}
                                renderSeparator={separator}
                                useBodyScroll={this.state.useBodyScroll}
                                style={this.state.useBodyScroll ? {} : {
                                    height: this.state.height,
                                    border: '1px solid #ddd',
                                    margin: '5px 0',
                                }}
                                pullToRefresh={<PullToRefresh
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.onRefresh}
                                />}
                                onEndReached={this.onEndReached}
                                pageSize={8}
                            />


                            {/*<ul className="dataList-list">
                             {
                             this.state.data.map((item, index) => (
                             <DeviceListItem key={index}
                             history={this.props.history}
                             list={item}
                             />
                             ))
                             }
                             </ul>*/}

                        </div>
                    </div>
                    <div className="mask" style={{display}} onClick={this.onOpenChange}></div>
                </section>


                {/*<ul className="filter-list">
                 <li className="filter-list-item">
                 <h6 className="filter-list-item-title">参会状态</h6>
                 <RadioGroup {...partProps} />
                 </li>
                 <li className="filter-list-item">
                 <h6 className="filter-list-item-title">客户类型</h6>
                 <RadioGroup {...customerProps} />
                 </li>
                 </ul>*/}
                {/*</div>*/}
            </Drawer>
        )
    }
}

const mapStateToProps = (state) => {
    const {sidebarStatus} = state.app
    return {
        sidebarStatus
    }
}

export default connect(mapStateToProps)(Customer)