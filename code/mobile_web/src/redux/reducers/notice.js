/**
 * Created by Administrator on 2017/8/4.
 */

export const ACTION_TYPES ={
    UPDATE_LIST:"NOTICE/UPDATE_LIST",
    UPDATE_FILTER:"NOTICE/UPDATE_FILTER",
    SAVE:"NOTICE/SAVE",
    DELETE:"NOTICE/DELETE"
};

const notice = (state = {
    byIds:{},
    list:[],
    lastFetchTime:localStorage.getItem("notice.fetchTime")
}, action) => {

    if(action.error){
        return state
    }

    switch (action.type) {

        case ACTION_TYPES.UPDATE_LIST: {
            let byIds = {}, list = [];
            if (action.payload.data) {
                action.payload.data.forEach((item) => {
                    if (item && item.noticeId != null) {
                        byIds[item.noticeId] = item
                        list.push(item.noticeId)
                    }
                });
            }

            return {
                ...state,
                list,
                byIds
            };
        }
        case ACTION_TYPES.SAVE:{
            let byIds = state.byIds;
            let info = action.payload.data

            if (info && info.noticeId){
                byIds[info.noticeId] = info
            }
            return {
                ...state,
                byIds
            };
        }
        case ACTION_TYPES.DELETE:{
            let byIds = state.byIds;
            if (action.payload.noticeId){
                delete  byIds[action.payload.noticeId]
            }
            return {
                ...state,
                byIds
            };
        }

        default:
            return state
    }
}

export default notice