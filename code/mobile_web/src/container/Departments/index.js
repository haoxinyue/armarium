import React, {Component} from 'react'
import {connect} from 'react-redux'
import './departments.less'

import {addRippleEffect} from '../../utils'


class Departments extends Component {


    render() {

        const {departments} = this.props

        const testData = [
            {
                DeptId: "1",
                DeptName: "科室1",
                DeptOwner: "李主任",
                ParentDeptId: "2",
                HospitalId: "2",
                DeptPath: "",
                Remark: "Remark",

            },{
                DeptId: "2",
                DeptName: "科室2",
                DeptOwner: "李主任",
                ParentDeptId: "2",
                HospitalId: "2",
                DeptPath: "",
                Remark: "Remark",

            },{
                DeptId: "3",
                DeptName: "科室3",
                DeptOwner: "李主任",
                ParentDeptId: "2",
                HospitalId: "2",
                DeptPath: "",
                Remark: "Remark",

            },{
                DeptId: "4",
                DeptName: "科室4",
                DeptOwner: "刘主任",
                ParentDeptId: "2",
                HospitalId: "2",
                DeptPath: "",
                Remark: "Remark",

            },{
                DeptId: "5",
                DeptName: "科室5",
                DeptOwner: "xxxx",
                ParentDeptId: "2",
                HospitalId: "2",
                DeptPath: "DisplayName1",
                Remark: "Remark",

            },
        ];

        const getItem = (info, index) => (
            <li key={index} className="departments-item " onTouchStart={(e) => {
                // addRippleEffect(e.currentTarget, e.pageX, e.pageY)
                let touch = e.touches[0]
                addRippleEffect(e.currentTarget, touch.pageX, touch.pageY)

            }} onClick={() => {
                if (info.link != null) {
                    this.props.history.push(info.link)
                }
            }}>
                <h3 className="item-name">{info.DeptName}</h3>
                <div className="item-content">
                    <div className="content-line">
                        <span className="key">负责人</span>
                        <span className="value">{info.DeptOwner}</span>
                    </div>
                    {/*<div className="content-line">
                        <span className="key">邮箱</span>
                        <span className="value">{info.Email}</span>
                    </div>*/}
                </div>
            </li>)

        return (
            <div className="departments">
                <div className="departments-content">
                    {(testData).map((u, i) => getItem(u, i))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {departments} = state.app
    return {
        departments
    }
}

export default connect(mapStateToProps)(Departments)