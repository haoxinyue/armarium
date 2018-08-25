/**
 * Created by Administrator on 2017/8/4.
 */

export const ACTION_TYPES = {
    UPDATE_LIST: "repair/UPDATE_LIST",
    UPDATE_FILTER: "repair/UPDATE_FILTER",
    SAVE: "repair/SAVE",
    DELETE: "repair/DELETE"
};

const repair = (state = {
    byIds: {},
    devices: [],
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
                    if (item && item.caseId != null) {
                        byIds[item.caseId] = item;
                        if (list.indexOf(item.caseId) === -1) {
                            list.push(item.caseId)
                        }
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
        case ACTION_TYPES.SAVE: {
            let byIds = state.byIds;
            let info = action.payload.data
            if (info.caseId) {
                byIds[info.caseId] = info
            }
            return {
                ...state,
                byIds
            };
        }
        case ACTION_TYPES.DELETE: {
            let byIds = state.byIds;
            if (action.payload.caseId) {
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

export default repair