/**
 * Created by Administrator on 2017/8/4.
 */

import * as types from '../actions/actionTypes'

const header = (state = {

	title: '',
	visible:false,
	rightContent:[],
    leftContent:[]
}, action) => {
	switch (action.type) {


		case types.CHANGE_HEADER_TITLE:
			return {
                ...state,
				title:action.title
			}
		case types.CHANGE_HEADER_VISIBLE:
			return {
                ...state,
				visible:action.visible
			}
		case types.CHANGE_HEADER_LEFT_CONTENT:
			return {
                ...state,
				leftContent:action.leftContent
			}
		case types.CHANGE_HEADER_RIGHT_CONTENT:
			return {
                ...state,
				rightContent:action.rightContent
			}
        default:
            return state
	}
}

export default header