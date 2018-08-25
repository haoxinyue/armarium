/**
 * Created by Administrator on 2017/8/4.
 */

export const ACTION_TYPES ={
    UPDATE_LIST:"DEVICE/UPDATE_LIST",
    UPDATE_FILTER:"DEVICE/UPDATE_FILTER",
    SAVE:"DEVICE/SAVE",
    DELETE:"DEVICE/DELETE"
};

const footer = (state = {
    byIds:{},
    list:[],
    filter: {
        pageIndex: 0,
        searchWord: '',
        state: 0
    }
}, action) => {
    switch (action.type) {

        case ACTION_TYPES.UPDATE_LIST: {
            let byIds = {}, list = [];
            if (action.payload.data) {
                action.payload.data.forEach((item) => {
                    if (item && item.deviceId != null) {
                        byIds[item.deviceId] = item
                        list.push(item.deviceId)
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
            if (info && info.deviceId){
                byIds[info.deviceId] = info
            }
            return {
                ...state,
                byIds
            };
        }
        case ACTION_TYPES.DELETE:{
            let byIds = state.byIds;
            if (action.payload.deviceId){
                delete  byIds[action.payload.deviceId]
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

export default footer