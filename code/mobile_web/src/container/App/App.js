import React, {Component} from 'react'
import {Redirect, Switch} from 'react-router-dom'
import {RouteWithSubRoutes} from '../../utils'
import {routes} from '../../router'

import Header from '../../components/Header'
import Footer from '../../components/Footer'


import './app.less'

class App extends Component {


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