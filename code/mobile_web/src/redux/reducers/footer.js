/**
 * Created by Administrator on 2017/8/4.
 */

export const ACTION_TYPES ={
    CHANGE_FOOTER_VISIBLE:"FOOTER/CHANGE_FOOTER_VISIBLE",
    CHANGE_FOOTER_SIDE:"FOOTER/CHANGE_FOOTER_SIDE",
};

const footer = (state = {
	visible:false,
	side:'left'
}, action) => {
	switch (action.type) {

		case ACTION_TYPES.CHANGE_FOOTER_VISIBLE:
			return {
                ...state,
				visible:action.visible
			};
		case ACTION_TYPES.CHANGE_FOOTER_SIDE:
			return {
                ...state,
				side:action.side
			}
        default:
            return state
	}
}

export default footer