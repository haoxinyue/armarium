/**
 * Created by Administrator on 2017/8/4.
 */

import { combineReducers } from 'redux'
import app from './app'
import header from './header'
import footer from './footer'
import auth from './auth'

const rootReducer = combineReducers({
	app,
    auth,
    footer,
    header
})

export default rootReducer