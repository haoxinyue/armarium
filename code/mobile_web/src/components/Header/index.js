/**
 * Created by Administrator on 2017/8/3.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, Icon} from 'antd-mobile'
import {addRippleEffect} from '../../utils'
import './header.less'
class Header extends Component {

    handleClick = (e) => {
        // const {history} = this.props
        // if (e.target.className === 'am-navbar-title') {
        //     history.push('/calender')
        //     return
        // }
        addRippleEffect(e.currentTarget, e.pageX, e.pageY,80)
    }



    back = (e) => {
        window.history.back()
    }


    render() {
        const leftContent = this.props.leftContent
        const rightContent = this.props.rightContent
        const title = this.props.title
        const visible = this.props.visible

        let headerLeft = [];
        if (leftContent){
            if (leftContent === "back"){
                headerLeft.push(
                    <div key="0" className="navbar-left" onClick={this.back}>
                    <Icon type="left"/>
                    <span>返回</span>
                </div>
                )
            }else if(leftContent instanceof Array){
                headerLeft = leftContent
            }
        }

        let headerRight = [];
        if (rightContent){
           if(rightContent instanceof Array){
                headerRight = rightContent
            }
        }



        return (
            <header onClick={this.handleClick} className="app-header " style={
                {display:visible?"":"none"}
            }>
                <NavBar key="0" leftContent={headerLeft}
                        iconName={false}
                        mode="dark"
                        rightContent={headerRight}
                >{title}</NavBar>


            </header>
        )
    }
}

const mapStateToProps = (state) => {
    const {backStatus, filterStatus, sidebarStatus,
        titleHidden,

        title,
        visible,
        leftContent,rightContent} = state.header
    return {
        backStatus,
        filterStatus,
        sidebarStatus,
        title,
        titleHidden,
        leftContent,
        rightContent,
        visible
    }
}

export default connect(mapStateToProps)(Header)