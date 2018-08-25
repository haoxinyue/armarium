import React, {Component} from 'react'
import {Redirect, Switch} from 'react-router-dom'
import {RouteWithSubRoutes} from '../../utils'
import {routes} from '../../router'

import {Modal} from 'antd-mobile'

import Header from '../../components/Header'
import Footer from '../../components/Footer'



import './app.less'

class App extends Component {

    componentWillMount(){
        // const chcp =window.chcp
        // if(chcp){
        //     chcp.fetchUpdate(function(error, data) {
        //         if(!error) {
        //             Modal.operation([{
        //                 text: '有新版本，点击更新', onPress: () => {
        //                     chcp.installUpdate(function(error) {
        //                         alert("更新完成");
        //                     })
        //                 }
        //             }])
        //         } else {
        //
        //         }
        //     })
        // }


    }

    render() {
        return (
            <div className="app" >
                <Header {...this.props} />

                <div className="main" >
                    <Switch>
                        {routes.map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route} />
                        ))}

                        <Redirect from="" push={true} to="/dashboard"/>
                        {/*<Redirect from="" push={true} to="/test"/>*/}

                    </Switch>
                </div>

                <Footer {...this.props} />

            </div>
        )
    }
}

export default App