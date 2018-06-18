import { queryAccessories,queryAccessoryDetail, removeAccessory, addAccessory,updateAccessory } from '../services/accessory';

export default {
  namespace: 'contract',

  state: {
    list: [],
    pagination: {},
    byIds:{}
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAccessories, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchDetail({ payload,callback }, { call, put }) {
      const response = yield call(queryAccessoryDetail, {
        accessoryId:Number(payload.accessoryId)
      });
      yield put({
        type: 'saveCurrent',
        payload: {
          ...response.data
        },
      });
      if (callback) callback(response.data);
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addAccessory, payload)||{};
      yield put({
        type: 'saveCurrent',
        payload: response.data,
      });
      if (callback) callback(response.data);
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeAccessory, payload);
      yield put({
        type: 'removeCurrent',
        payload: {
          accessoryId:payload.accessoryId
        },
      });
      if (callback) callback(response);
    },
    *updateDetail({ payload, callback }, { call, put }) {
      const response = yield call(updateAccessory, payload);
      yield put({
        type: 'saveCurrent',
        payload: response.data,
      });
      if (callback) callback(response);
    },
  },

  reducers: {
    save(state, action) {
      let byIds = {},list =[];
      if (action.payload.data){
        action.payload.data.forEach((item)=>{
          if (item && item.accessoryId !=null){
            byIds[item.accessoryId] = item
            if (list.indexOf(item.accessoryId)===-1){
              list.push(item.accessoryId)
            }
          }
        });
      }


      return {
        ...state,
        list,
        pagination:{
          total:action.payload.recordCount
        },
        byIds
      };
    },
    saveCurrent(state,action){
      if (!action.payload){
        return {
          ...state
        }
      }
      let byIds = Object.assign({},state.byIds);
      byIds[action.payload.accessoryId] = action.payload;

      return {
        ...state,
        byIds
      }
    },
    removeCurrent(state,action){
      let id = action.accessoryId;
      let idx = state.list.indexOf(id);
      state.list.splice(idx,1);
      let list = state.list;
      let byIds = state.byIds;
      delete byIds[id];

      return {
        ...state,
        list,
        byIds
      }
    }
  },

  subscriptions:{
    setup({ dispatch }) {
      dispatch({ type: 'fetch' });
    }
  }
};
