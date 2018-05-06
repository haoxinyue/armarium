import React, {Component} from 'react'

import './dashboard.less'

import {addRippleEffect} from '../../utils'


class Dashboard extends Component {


    render() {

        const blocks =[
            {
                title:"管理",
                items:[
                    {
                        image:require("../../assets/img/hospital/if_2_hospital_2774748.png"),
                        desc:"人员管理",
                        link:"/users"
                    },
                    {
                        image:require("../../assets/img/hospital/if_8_hospital_2774754.png"),
                        desc:"设备管理",
                        link:"/devices"
                    },
                    {
                        image:require("../../assets/img/hospital/if_3_hospital_2774749.png"),
                        desc:"科室管理",
                        link:"/departments"
                    },
                    {
                        image:require("../../assets/img/hospital/if_12_hospital_2774743.png"),
                        desc:"更多"
                    },
                ]
            },
            {
                title:"操作",
                items:[
                    {
                        image:require("../../assets/img/hospital/if_13_hospital_2774744.png"),
                        desc:"添加设备"
                    },
                ]
            },
            {
                title:"其他",
                items:[
                    {
                        image:require("../../assets/img/hospital/if_6_hospital_2774752.png"),
                        desc:"信息"
                    }
                ]
            }
        ]

        const getItem = (info)=>(
            <li key={info.desc} className="item am-list-item" onTouchStart={(e)=>{
                // addRippleEffect(e.currentTarget, e.pageX, e.pageY)
                let touch = e.touches[0]
                addRippleEffect(e.currentTarget, touch.pageX, touch.pageY)
                // e.currentTarget.classList.add("active")

            }} onClick={()=>{
                if(info.link != null){
                    this.props.history.push(info.link)
                }
            }}>
            <img src={info.image} alt=""/>
            <p className="desc">{info.desc}</p>
        </li>
        )

        return (
            <div className="dashboard" >
                <div className="dash-content">
                    {
                        blocks.map((block,index)=><ul key={index} className="dash-block">
                            <div className="title">
                                <span>{block.title}</span>
                            </div>
                            <div className="content">
                                {block.items.map((item)=>getItem(item))}
                            </div>
                        </ul>)
                    }
                </div>
            </div>
        )
    }
}

export default Dashboard