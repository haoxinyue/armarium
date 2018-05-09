/**
 * Created by Administrator on 2017/8/4.
 */

import * as types from '../actions/actionTypes'

const footer = (state = {
	visible:false
}, action) => {
	switch (action.type) {

		case types.CHANGE_FOOTER_VISIBLE:
			return {
                ...state,
				visible:action.visible
			}
        default:
            return state
	}
}

export default footer