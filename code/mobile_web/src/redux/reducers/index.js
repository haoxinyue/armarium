/**
 * Created by Administrator on 2017/8/4.
 */

import { combineReducers } from 'redux'
import app from './app'
import header from './header'
import footer from './footer'
import device from './device'
import repair from './repair'
import auth from './auth'
import installCase from './installCase'
import pmCase from './pmCase'
import notice from './notice'
import inspectionCase from './inspectionCase'

const rootReducer = combineReducers({
	app,
    auth,
    footer,
    device,
    installCase,
    inspectionCase,
    pmCase,
    header,
    notice,
    repair
})

export default rootReducer