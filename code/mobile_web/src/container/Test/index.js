import React, {Component} from 'react'
import DepartmentSelector from '../../components/DepartmentSelector'
import './app.less'

class Test extends Component {
    render() {
        return (
            <div className="test-page">
                <DepartmentSelector/>
            </div>
        )
    }
}

export default Test