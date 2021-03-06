import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Modal, Toast, Badge, Button} from 'antd-mobile'

import './dashboard.less'

import {addRippleEffect, getLocalPicture} from '../../utils'
import {scanDeviceQr} from "../../utils/tools";


import {logout, changeFooterSide, fetchNoticeList, changeHeaderRight} from '../../redux/actions'

class Dashboard extends Component {


    // cordovaHTTP
    componentDidMount() {
        this.props.dispatch(changeFooterSide('left'))

        const {dispatch} = this.props;
        dispatch(changeHeaderRight([
            <Button key="1" size="small" type="primary" onClick={this.scanDevice.bind(this)}><img
                style={{height: '70%', marginTop: '15%'}} src={require("../../assets/img/scan.png")} alt=""/></Button>
        ]))

        this.clearBackListen = this.initBack()


        this.updateNotice.bind(this)(true);

    }

    updateNotice(force) {
        const {notice, dispatch, userInfo} = this.props;
        let now = new Date().getTime();
        let last = notice.lastFetchTime;
        //3个小时获取一次通知信息
        if (force || !last || now - last > 1000 * 60 * 60 * 3) {
            dispatch(fetchNoticeList({
                userId: userInfo.userId
            }))
        }

    }

    initBack() {
        document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady() {
            //navigator.splashscreen.hide();
            document.addEventListener("backbutton", onBackKeyDown, false);
        }

        var intervalID;

        function onBackKeyDown() {
            Toast.info('再点击一次退出!');
            document.removeEventListener("backbutton", onBackKeyDown, false); // 注销返回键
            document.addEventListener("backbutton", exitApp, false);//绑定退出事件
            // 3秒后重新注册
            intervalID = window.setInterval(function () {
                window.clearInterval(intervalID);
                document.removeEventListener("backbutton", exitApp, false); // 注销返回键
                document.addEventListener("backbutton", onBackKeyDown, false); // 返回键
            }, 3000);
        }

        function exitApp() {
            navigator.app.exitApp();
        }

        function clearBackListen() {
            console.log("clearBackListen")
            clearInterval(intervalID);
            document.removeEventListener("backbutton", exitApp, false);
            document.removeEventListener("deviceready", onDeviceReady, false)
            document.removeEventListener("backbutton", onBackKeyDown, false);
        }

        return clearBackListen

    }

    componentWillUnmount() {
        this.clearBackListen && this.clearBackListen()
    }

    scanDevice() {
        scanDeviceQr().then((deviceId) => {
            this.props.history.push({pathname: "/deviceDetail/" + deviceId})
            }, (error) => {
            Toast.info(error||"请重新扫描");
            }
        )
    }


    uploadFile(fromCamera) {
        getLocalPicture(fromCamera).then((res) => {
            alert(res)
        }, () => {
            alert('failed')
        })
    }

    render() {
        const { notice,userInfo={}} = this.props;
        const {roleId} = userInfo;

        const blocks = [
            {
                title: "工单管理",
                items: [
                    {
                        image: require("../../assets/img/hospital/if_2_hospital_2774748.png"),
                        desc: "设备管理",
                        link: "/devices",
                        noticeTag: 'devices'
                    },
                    {
                        image: require("../../assets/img/hospital/if_6_hospital_2774752.png"),
                        desc: "设备维修",
                        // link:"/deviceAdd",
                        func(item) {
                            let ops =[
                                {
                                    text: '填写工单', onPress: () => {
                                        this.props.history.push({pathname: "/repairAdd", query: {}})
                                    }
                                },
                                {
                                    text: '扫描设备', onPress: () => {
                                        scanDeviceQr().then((deviceId) => {
                                            this.props.history.push({pathname: "/repairAdd", query: {deviceId}})
                                            }, (error) => {
                                            Toast.info(error||"请重新扫描");
                                            }
                                        )
                                    }
                                },

                                /*{
                                    text: '报修历史', onPress: () => {
                                        this.props.history.push({pathname: "/repairs", query: {}})
                                    }
                                },*/
                            ]

                            switch (roleId+''){
                                case '1':
                                case '2':
                                    ops = ops.concat([
                                        {
                                            text: '我的维修', onPress: () => {
                                                this.props.history.push({pathname: "/repairsMy", query: {}})
                                            }
                                        },

                                    ])
                                    break;

                                case '3':
                                case '4':
                                    ops = ops.concat([
                                        {
                                            text: '我的报修', onPress: () => {
                                                this.props.history.push({pathname: "/repairsMyReport", query: {}})
                                            }
                                        },

                                    ])
                                    break;
                            }


                            Modal.operation(ops)
                        }
                    },
                    {
                        image: require("../../assets/img/hospital/if_8_hospital_2774754.png"),
                        desc: "设备保养",
                        link: "/pmCaseList"
                    },
                    {
                        image: require("../../assets/img/hospital/if_11_hospital_2774742.png"),
                        desc: "设备巡检",
                        link: "/inspectionCaseList"
                    },
                    // {
                    //     image: require("../../assets/img/hospital/if_2_hospital_2774748.png"),
                    //     desc: "派单管理",
                    //     link: "/repairs",
                    //     noticeTag: 'repair'
                    // },

                    {
                        image: require("../../assets/img/hospital/if_8_hospital_2774754.png"),
                        desc: "设备计量",
                        link: "/meterCaseList",

                    },
                    {
                        image: require("../../assets/img/hospital/if_13_hospital_2774744.png"),
                        desc: "设备安装",
                        link: "/installCaseList",
                        noticeTag: 'installCase'

                    },
                    {
                        image: require("../../assets/img/hospital/if_2_hospital_2774748.png"),
                        desc: "我的消息",
                        link: "/noticeList",
                        noticeTag: 'noticeIndex'
                    },

                ]
            },
            {
                title: "资产管理",
                items: [
                    {
                        image: require("../../assets/img/hospital/if_13_hospital_2774744.png"),
                        desc: "添加资产",
                        // link: "/devices"
                        link: "/deviceAdd"
                    },
                    {
                        image: require("../../assets/img/hospital/if_8_hospital_2774754.png"),
                        desc: "资产盘点",
                        link: "/stocktakingCase"
                    },
                    {
                        image: require("../../assets/img/hospital/if_10_hospital_2774741.png"),
                        desc: "文档管理",
                        link1: "/devices",
                        func() {
                            Modal.operation([
                                {
                                    text: '暂未开放', onPress: () => {
                                    }
                                }
                            ])
                        }
                    },
                    {
                        image: require("../../assets/img/hospital/if_11_hospital_2774742.png"),
                        desc: "统计报表",
                        link: "/test"
                    },
                    {
                        image: require("../../assets/img/hospital/if_12_hospital_2774743.png"),
                        desc: "不良事件",
                        link1: "/devices",
                        func() {
                            Modal.operation([
                                {
                                    text: '暂未开放', onPress: () => {
                                    }
                                }
                            ])
                        }
                    },
                    {
                        image: require("../../assets/img/hospital/if_14_hospital_2774745.png"),
                        desc: "角色设置",
                        link1: "/devices",
                        func() {
                            Modal.operation([
                                {
                                    text: '暂未开放', onPress: () => {
                                    }
                                }
                            ])
                        }
                    },
                ]
            },
            {
                title: "其他",
                items: [
                    {
                        image: require("../../assets/img/hospital/if_2_hospital_2774748.png"),
                        desc: "资产购置",
                        func() {
                            Modal.operation([
                                {
                                    text: '暂未开放', onPress: () => {
                                    }
                                }
                            ])
                        }
                    }, {
                        image: require("../../assets/img/hospital/if_3_hospital_2774749.png"),
                        desc: "供应商管理",
                        func() {
                            Modal.operation([
                                {
                                    text: '暂未开放', onPress: () => {
                                    }
                                }
                            ])
                        }
                    }, {
                        image: require("../../assets/img/hospital/if_4_hospital_2774750.png"),
                        desc: "远程监控",
                        func() {
                            Modal.operation([
                                {
                                    text: '暂未开放', onPress: () => {
                                    }
                                }
                            ])
                        }
                    }, {
                        image: require("../../assets/img/hospital/if_7_hospital_2774753.png"),
                        desc: "绩效管理",
                        func() {
                            Modal.operation([
                                {
                                    text: '暂未开放', onPress: () => {
                                    }
                                }
                            ])
                        }
                    }, {
                        image: require("../../assets/img/hospital/if_8_hospital_2774754.png"),
                        desc: "故障预警",
                        func() {
                            Modal.operation([
                                {
                                    text: '暂未开放', onPress: () => {
                                    }
                                }
                            ])
                        }
                    }, {
                        image: require("../../assets/img/hospital/if_10_hospital_2774741.png"),
                        desc: "借用调拨",
                        func() {
                            Modal.operation([
                                {
                                    text: '暂未开放', onPress: () => {
                                    }
                                }
                            ])
                        }
                    },
                ]
            },
            /*{
                title: "操作",
                items: [
                    {
                        image: require("../../assets/img/hospital/if_10_hospital_2774741.png"),
                        desc: "退出",
                        func() {
                            dispatch(logout(userToken)).then(() => {
                                Toast.info("已退出")
                                history.replace('/login')
                            })
                        }
                    },
                ]
            }*/
            /*,
            {
                title: "其他",
                items: [
                    {
                        image: require("../../assets/img/hospital/if_6_hospital_2774752.png"),
                        desc: "上传图片",
                        func(){

                            Modal.operation([
                                {
                                    text: '相册', onPress: () => {
                                    this.uploadFile(false)
                                }
                                },
                                {
                                    text: '摄像头', onPress: () => {
                                    this.uploadFile(true)
                                }
                                },
                            ])

                        }
                    }
                ]
            }*/
        ]

        if(roleId == 3 || roleId == 4){
            //
            blocks[0].items =  blocks[0].items.filter(d=>!["设备保养","设备巡检","设备计量"].includes(d.desc))
        }

        const getItem = (info) => {

            let hasNotice =  info.noticeTag && notice.byTypes[info.noticeTag];

            return <li key={info.desc} className="item am-list-item" onTouchStart={(e) => {
                // addRippleEffect(e.currentTarget, e.pageX, e.pageY)
                let touch = e.touches[0]
                addRippleEffect(e.currentTarget, touch.pageX, touch.pageY)
                // e.currentTarget.classList.add("active")

            }} onClick={() => {
                if (info.link != null) {
                    this.props.history.push(info.link)
                } else if (info.func != null) {
                    info.func.bind(this)(info)
                }
            }}>

                {


                    hasNotice ? <Badge text={hasNotice}>
                            <img src={info.image} alt=""/>
                            <p className="desc">{info.desc}</p>
                        </Badge> :
                        <div>
                            <img src={info.image} alt=""/>
                            <p className="desc">{info.desc}</p>
                        </div>

                }

            </li>
        }


        return (
            <div className="dashboard">
                <div className="dash-content">
                    {
                        blocks.map((block, index) => <ul key={index} className="dash-block">
                            <div className="title">
                                <span>{block.title}</span>
                            </div>
                            <div className="content">
                                {block.items.map((item) => getItem(item))}
                            </div>

                        </ul>)
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {token, userInfo} = state.auth;
    const notice = state.notice;
    return {
        userInfo,
        userToken: token,
        notice
    }
}

export default connect(mapStateToProps)(Dashboard)