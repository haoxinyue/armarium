/**
 * Created by zhouzechen on 2018/5/5.
 */
import React from 'react';
import {connect} from 'react-redux';
import {changeHeaderTitle, changeHeaderLeft, changeHeaderRight, changeHeaderVisible,changeFooterVisible} from '../../redux/actions'

export function baseInit(Component) {

    class BaseLayoutComponent extends React.Component {

        componentWillMount() {
            this.updateHeader();
        }

        componentWillReceiveProps(nextProps) {
            this.updateHeader();
        }

        updateHeader() {
            const {dispatch, route} = this.props
            // dispatch(changeHeaderLeft(false))
            let title = (route && route.header && route.header.title) || "";
            let visible = (route && route.header && route.header.visible);
            if (visible == null) {
                visible = true
            }

            dispatch(changeHeaderTitle(title));
            dispatch(changeHeaderVisible(visible));

            let left = (route && route.header && route.header.left) || [];
            dispatch(changeHeaderLeft(left));

            let right = (route && route.header && route.header.right) || [];
            dispatch(changeHeaderRight(right));

            let fvisible = !!(route && route.footer && route.footer.visible);
            dispatch(changeFooterVisible(fvisible));
        }

        render() {
            return (
                <Component {...this.props}/>
            )

        }
    }

    const mapStateToProps = (state) => ({});

    return connect(mapStateToProps)(BaseLayoutComponent);

}