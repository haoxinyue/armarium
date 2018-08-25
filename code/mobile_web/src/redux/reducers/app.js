/**
 * Created by Administrator on 2017/8/4.
 */

export const ACTION_TYPES = {
    SAVE_META_DATA: "APP/SAVE_META_DATA",
    SAVE_LIST_DATA: "APP/SAVE_LIST_DATA",
    UPLOAD_FILE:"APP/UPLOAD_FILE"
};

const app = (state = {
    metaData: [],
    listData: {},
    users: [],
    notice: {
    }
}, action) => {
    switch (action.type) {

        case ACTION_TYPES.SAVE_META_DATA:
            return {
                ...state,
                metaData: action.playLoad
            };
        case ACTION_TYPES.SAVE_LIST_DATA:
            return {
                ...state,
                listData: action.playLoad
            };
        case ACTION_TYPES.UPLOAD_FILE:
            return {
                ...state
            };
        default:
            return state
    }
}

export default app