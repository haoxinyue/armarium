/**
 * Created by Administrator on 2017/8/3.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addRippleEffect} from '../../utils'
import './footer.less'
class Footer extends Component {

    state={
        active:'left'
    }

    handleClick = (side,e) => {
        // const {history} = this.props
        // if (e.target.className === 'am-navbar-title') {
        //     history.push('/calender')
        //     return
        // }
        addRippleEffect(e.currentTarget, e.pageX, e.pageY, 80)

        this.setState({
            active:side
        })
    }



    render() {

        const {visible} = this.props
        const {active} = this.state
        return (
            <footer  className="app-footer " style={
                {display: visible ? "" : "none"}
            }>

                <div className="content">
                    <div className={["item",active === "left"?"active":""].join(" ")} onClick={this.handleClick.bind(this,'left')}>
                        <div className="item-icon fa fa-2x fa-home"></div>
                        <div className="item-desc">主页</div>
                    </div>
                    <div className={["item",active !== "left"?"active":""].join(" ")} onClick={this.handleClick.bind(this,'right')}>
                        <div className="item-icon fa fa-2x fa-user"></div>
                        <div className="item-desc">我的</div>
                    </div>

                </div>

            </footer>
        )
    }
}

const mapStateToProps = (state) => {
    const {visible} = state.footer
    return {
        visible
    }
}

export default connect(mapStateToProps)(Footer)