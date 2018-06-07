import { queryContracts,queryContractDetail, removeContract, addContract,updateContract } from '../services/contract';

export default {
  namespace: 'contract',

  state: {
    list: [],
    pagination: {},
    byIds:{}
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryContracts, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchDetail({ payload,callback }, { call, put }) {
      const response = yield call(queryContractDetail, {
        contractId:Number(payload.contractId)
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
      const response = yield call(addContract, payload)||{};
      yield put({
        type: 'saveCurrent',
        payload: response.data,
      });
      if (callback) callback(response.data);
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeContract, payload);
      yield put({
        type: 'removeCurrent',
        payload: {
          contractId:payload.contractId
        },
      });
      if (callback) callback(response);
    },
    *updateDetail({ payload, callback }, { call, put }) {
      const response = yield call(updateContract, payload);
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
          if (item && item.contractId !=null){
            byIds[item.contractId] = item
            list.push(item.contractId)
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
      byIds[action.payload.contractId] = action.payload;

      return {
        ...state,
        byIds
      }
    },
    removeCurrent(state,action){
      let id = action.contractId;
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
