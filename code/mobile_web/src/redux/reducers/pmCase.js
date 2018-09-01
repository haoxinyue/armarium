/**
 * Created by Administrator on 2017/8/4.
 */

export const ACTION_TYPES ={
    UPDATE_LIST:"PM_CASE/UPDATE_LIST",
    UPDATE_FILTER:"PM_CASE/UPDATE_FILTER",
    SAVE:"PM_CASE/SAVE",
    DELETE:"PM_CASE/DELETE"
};

const pmCase = (state = {
    byIds:{},
    list:[],
    filter: {
        pageIndex: 0,
        searchWord: '',
        state: 0
    }
}, action) => {

    if(action.error){
        return state
    }

    switch (action.type) {

        case ACTION_TYPES.UPDATE_LIST: {
            let byIds = {}, list = [];
            if (action.payload.data) {
                action.payload.data.forEach((item) => {
                    if (item && item.caseId != null) {
                        byIds[item.caseId] = item
                        list.push(item.caseId)
                    }
                });
            }

            return {
                ...state,
                list,
                byIds
            };
        }
        case ACTION_TYPES.UPDATE_FILTER:
            return {
                ...state,
                filter: Object.assign(state.filter, action.payload)
            };
        case ACTION_TYPES.SAVE:{
            let byIds = state.byIds;
            let info = action.payload.data

            if (info && info.caseId){
                byIds[info.caseId] = info
            }
            return {
                ...state,
                byIds
            };
        }
        case ACTION_TYPES.DELETE:{
            let byIds = state.byIds;
            if (action.payload.caseId){
                delete  byIds[action.payload.caseId]
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

export default pmCase