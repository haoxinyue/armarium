/**
 * Created by Administrator on 2017/8/4.
 */

import { combineReducers } from 'redux'
import app from './app'
import header from './header'

const rootReducer = combineReducers({
	app,
    header
})

export default rootReducer