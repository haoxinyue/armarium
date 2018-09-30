/**
 * Created by Administrator on 2017/8/4.
 */

export const ACTION_TYPES ={
    UPDATE_LIST:"NOTICE/UPDATE_LIST",
    UPDATE_FILTER:"NOTICE/UPDATE_FILTER",
    SAVE:"NOTICE/SAVE",
    DELETE:"NOTICE/DELETE"
};

function getByTypesFromList(state, list) {
    let byTypes = {
        noticeIndex:list.length
    };
    list.forEach((id)=>{
        if(state.byIds[id]&&state.byIds[id].type){
            if(!byTypes[state.byIds[id].type]){
                byTypes[state.byIds[id].type]=[id]
            }else{
                byTypes[state.byIds[id].type].push(id);
            }
        }
    });


    return byTypes;
}

const notice = (state = {
    byIds:JSON.parse(localStorage.getItem("notice.byIds")||"{}"),
    list:JSON.parse(localStorage.getItem("notice.list")||"[]"),
    byTypes:JSON.parse(localStorage.getItem("notice.byTypes")||"{}"),
    lastFetchTime:Number(localStorage.getItem("notice.fetchTime")||0)
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
                        byIds[item.noticeId] = item;
                        list.push(item.noticeId);
                    }
                });
            }

            let lastFetchTime = new Date().getTime();

            let byTypes = getByTypesFromList(state,list);
            localStorage.setItem("notice.fetchTime",lastFetchTime+"");
            localStorage.setItem("notice.list",JSON.stringify(list));
            localStorage.setItem("notice.byIds",JSON.stringify(byIds));
            localStorage.setItem("notice.byTypes",JSON.stringify(byTypes));
            return {
                ...state,
                list,
                byIds,
                lastFetchTime,
                byTypes
            };
        }
        case ACTION_TYPES.SAVE:{
            let byIds = state.byIds;
            let info = action.payload.data

            if (info && info.noticeId){
                byIds[info.noticeId] = info
            }
            localStorage.setItem("notice.byIds",JSON.stringify(byIds));
            return {
                ...state,
                byIds
            };
        }
        case ACTION_TYPES.DELETE:{
            let byIds = state.byIds;
            let list =  [].concat(state.list);
            if (action.payload.noticeId){
                delete  byIds[action.payload.noticeId]
            }
            let idx = list.indexOf(action.payload.noticeId);
            list.splice(idx,1);

            let byTypes = getByTypesFromList(state,state.list);

            localStorage.setItem("notice.list",JSON.stringify(list));
            localStorage.setItem("notice.byIds",JSON.stringify(byIds));
            localStorage.setItem("notice.byTypes",JSON.stringify(byTypes));

            return {
                ...state,
                list,
                byIds,
                byTypes
            };
        }

        default:
            return state
    }
}

export default notice