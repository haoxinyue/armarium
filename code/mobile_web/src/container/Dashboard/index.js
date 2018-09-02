import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Modal, Toast, Badge} from 'antd-mobile'

import './dashboard.less'

import {addRippleEffect, runScanner, getLocalPicture} from '../../utils'

import {logout,changeFooterSide,fetchNoticeList} from '../../redux/actions'

class Dashboard extends Component {


    // cordovaHTTP
    componentDidMount() {
        this.props.dispatch(changeFooterSide('left'))
    }


    uploadFile(fromCamera) {
        getLocalPicture(fromCamera).then((res) => {
            alert(res)
        }, () => {
            alert('failed')
        })
    }

    render() {
        const {dispatch, userToken, history, notice} = this.props;

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
                            Modal.operation([
                                {
                                    text: '直接填写', onPress: () => {
                                        this.props.history.push({pathname: "/repairAdd", query: {}})
                                    }
                                },
                                {
                                    text: '扫描设备', onPress: () => {
                                        runScanner().then((result) => {
                                                let deviceId = /\[(\S+)\]/.exec(result.text)
                                                deviceId = deviceId && deviceId[1]
                                                if (deviceId) {
                                                    this.props.history.push({pathname: "/repairAdd", query: {deviceId}})
                                                } else {
                                                    // alert('无效的二维码')
                                                }
                                            }, (error) => {
                                                alert("请重新扫描");
                                            }
                                        )
                                    }
                                },
                            ])
                            // runScanner().then((result) => {
                            //         // alert("We got a barcode\n" +
                            //         //     "Result: " + result.text + "\n" +
                            //         //     "Format: " + result.format + "\n" +
                            //         //     "Cancelled: " + result.cancelled);
                            //         let  deviceId = /\[(\S+)\]/.exec(result.text)
                            //             deviceId = deviceId && deviceId[1]
                            //         if(deviceId){
                            //             alert('即将进入设备【'+deviceId+'】')
                            //         }else{
                            //             alert('无效的二维码')
                            //         }
                            //
                            //
                            //     }, (error) => {
                            //         alert("扫描失败: " + error);
                            //     }
                            // )
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
                        link: "/devices",

                    },
                    {
                        image: require("../../assets/img/hospital/if_13_hospital_2774744.png"),
                        desc: "设备安装",
                        link: "/installCaseList",
                        noticeTag: 'installCase'

                    },

                ]
            },
            {
                title: "资产管理",
                items: [
                    {
                        image: require("../../assets/img/hospital/if_13_hospital_2774744.png"),
                        desc: "添加资产",
                        link: "/deviceAdd"
                    },
                    {
                        image: require("../../assets/img/hospital/if_8_hospital_2774754.png"),
                        desc: "资产盘点",
                        link: "/devices"
                    },
                    {
                        image: require("../../assets/img/hospital/if_10_hospital_2774741.png"),
                        desc: "文档管理",
                        link: "/devices"
                    },
                    {
                        image: require("../../assets/img/hospital/if_11_hospital_2774742.png"),
                        desc: "统计报表",
                        link: "/devices"
                    },
                    {
                        image: require("../../assets/img/hospital/if_12_hospital_2774743.png"),
                        desc: "不良事件",
                        link: "/devices"
                    },
                    {
                        image: require("../../assets/img/hospital/if_14_hospital_2774745.png"),
                        desc: "角色设置",
                        link: "/devices"
                    },
                ]
            },
            {
                title: "其他",
                items: [
                    {
                        image: require("../../assets/img/hospital/if_2_hospital_2774748.png"),
                        desc: "我的消息",
                        link:"/noticeList"
                    },{
                        image: require("../../assets/img/hospital/if_2_hospital_2774748.png"),
                        desc: "资产购置",
                        func(){
                            Modal.operation([
                                {
                                    text: '敬请期待', onPress: () => {
                                    }
                                }
                            ])
                        }
                    },{
                        image: require("../../assets/img/hospital/if_3_hospital_2774749.png"),
                        desc: "供应商管理",
                        func(){
                            Modal.operation([
                                {
                                    text: '敬请期待', onPress: () => {
                                    }
                                }
                            ])
                        }
                    },{
                        image: require("../../assets/img/hospital/if_4_hospital_2774750.png"),
                        desc: "远程监控",
                        func(){
                            Modal.operation([
                                {
                                    text: '敬请期待', onPress: () => {
                                    }
                                }
                            ])
                        }
                    },{
                        image: require("../../assets/img/hospital/if_7_hospital_2774753.png"),
                        desc: "绩效管理",
                        func(){
                            Modal.operation([
                                {
                                    text: '敬请期待', onPress: () => {
                                    }
                                }
                            ])
                        }
                    },{
                        image: require("../../assets/img/hospital/if_8_hospital_2774754.png"),
                        desc: "故障预警",
                        func(){
                            Modal.operation([
                                {
                                    text: '敬请期待', onPress: () => {
                                    }
                                }
                            ])
                        }
                    },{
                        image: require("../../assets/img/hospital/if_10_hospital_2774741.png"),
                        desc: "借用调拨",
                        func(){
                            Modal.operation([
                                {
                                    text: '敬请期待', onPress: () => {
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

        const getItem = (info) => {

            let hasNotice = info.noticeTag && notice[info.noticeTag]

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


                    hasNotice ? <Badge dot>
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
    const {token} = state.auth
    const {notice} = state.app
    return {
        userToken: token,
        notice
    }
}

export default connect(mapStateToProps)(Dashboard)