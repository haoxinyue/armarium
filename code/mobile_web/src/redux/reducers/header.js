/**
 * Created by Administrator on 2017/8/4.
 */

export const ACTION_TYPES ={
    CHANGE_HEADER_TITLE:"HEADER/CHANGE_HEADER_TITLE",
    CHANGE_HEADER_VISIBLE:"HEADER/CHANGE_HEADER_VISIBLE",
    CHANGE_HEADER_LEFT_CONTENT:"HEADER/CHANGE_HEADER_LEFT_CONTENT",
    CHANGE_HEADER_RIGHT_CONTENT:"HEADER/CHANGE_HEADER_RIGHT_CONTENT",
};

const header = (state = {

	title: '',
	visible:false,
	rightContent:[],
    leftContent:[]
}, action) => {
	switch (action.type) {


		case ACTION_TYPES.CHANGE_HEADER_TITLE:
			return {
                ...state,
				title:action.title
			}
		case ACTION_TYPES.CHANGE_HEADER_VISIBLE:
			return {
                ...state,
				visible:action.visible
			}
		case ACTION_TYPES.CHANGE_HEADER_LEFT_CONTENT:
			return {
                ...state,
				leftContent:action.leftContent
			}
		case ACTION_TYPES.CHANGE_HEADER_RIGHT_CONTENT:
			return {
                ...state,
				rightContent:action.rightContent
			}
        default:
            return state
	}
}

export default header