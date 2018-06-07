import { queryPurchases,queryPurchaseDetail, removePurchase, addPurchase,updatePurchase } from '../services/purchase';

export default {
  namespace: 'purchase',

  state: {
    list: [],
    pagination: {},
    byIds:{}
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryPurchases, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchDetail({ payload,callback }, { call, put }) {
      const response = yield call(queryPurchaseDetail, {
        purchaseId:Number(payload.purchaseId)
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
      const response = yield call(addPurchase, payload)||{};
      yield put({
        type: 'saveCurrent',
        payload: response.data,
      });
      if (callback) callback(response.data);
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removePurchase, payload);
      yield put({
        type: 'removeCurrent',
        payload: {
          purchaseId:payload.purchaseId
        },
      });
      if (callback) callback(response);
    },
    *updateDetail({ payload, callback }, { call, put }) {
      const response = yield call(updatePurchase, payload);
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
          if (item && item.purchaseId !=null){
            byIds[item.purchaseId] = item
            list.push(item.purchaseId)
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
      byIds[action.payload.purchaseId] = action.payload;

      return {
        ...state,
        byIds
      }
    },
    removeCurrent(state,action){
      let id = action.purchaseId;
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
