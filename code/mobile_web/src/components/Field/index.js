/**
 * Created by zhouzechen on 2018/5/8.
 */
import React ,{Component} from 'react';
import {connect} from 'react-redux';

class Footer extends Component {

    state={
        active:'left'
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