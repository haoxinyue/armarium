/**
 * Created by Administrator on 2017/8/4.
 */

import * as types from '../actions/actionTypes'

const app = (state = {
	metaData: [],
	listData: {},
	users:[]
}, action) => {
	switch (action.type) {

		case types.SAVE_META_DATA:
			return {
				...state,
				metaData: action.playLoad
			}
		case types.SAVE_LIST_DATA:
			return {
				...state,
				listData: action.playLoad
			}
		default:
			return state
	}
}

export default app