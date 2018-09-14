import React, {Component} from 'react'
import DepartmentSelector from '../../components/DepartmentSelector'
import './app.less'

const chartImg = require("../../assets/img/chart.png")

class Test extends Component {




    render() {
        return (
            <div className="test-page">

                <img style={{width:'100%'}} src={chartImg} alt=""/>
            </div>
        )
    }
}

export default Test




