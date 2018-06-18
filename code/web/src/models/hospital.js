import { queryHospitals,queryHospitalDetail, removeHospital, addHospital,updateHospital } from '../services/hospital';

export default {
  namespace: 'hospital',

  state: {
    list: [],
    pagination: {},
    byIds:{}
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryHospitals, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchDetail({ payload,callback }, { call, put }) {
      const response = yield call(queryHospitalDetail, {
        hospitalId:Number(payload.hospitalId)
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
      const response = yield call(addHospital, payload)||{};
      yield put({
        type: 'saveCurrent',
        payload: response.data,
      });
      if (callback) callback(response.data);
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeHospital, payload);
      yield put({
        type: 'removeCurrent',
        payload: {
          hospitalId:payload.hospitalId
        },
      });
      if (callback) callback(response);
    },
    *updateDetail({ payload, callback }, { call, put }) {
      const response = yield call(updateHospital, payload);
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
          if (item && item.hospitalId !=null){
            byIds[item.hospitalId] = item

            if (list.indexOf(item.hospitalId)===-1){
              list.push(item.hospitalId)
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
      byIds[action.payload.hospitalId] = action.payload

      return {
        ...state,
        byIds
      }
    },
    removeCurrent(state,action){
      let id = action.hospitalId
      let idx = state.list.indexOf(id)
      state.list.splice(idx,1)
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
