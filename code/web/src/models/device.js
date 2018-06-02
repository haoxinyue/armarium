import { queryDevices,queryDeviceDetail, removeDevice, addDevice,updateDevice } from '../services/api';

export default {
  namespace: 'device',

  state: {
    list: [],
    pagination: {},
    byIds:{},
    currentDetail:null
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryDevices, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchDetail({ payload,callback }, { call, put }) {
      const response = yield call(queryDeviceDetail, {
        deviceId:Number(payload.deviceId)
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
      const response = yield call(addDevice, payload)||{};
      yield put({
        type: 'saveCurrent',
        payload: response.data,
      });
      if (callback) callback(response.data);
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeDevice, payload);
      yield put({
        type: 'removeCurrent',
        payload: {
          deviceId:payload.deviceId
        },
      });
      if (callback) callback(response);
    },
    *updateDetail({ payload, callback }, { call, put }) {
      const response = yield call(updateDevice, payload);
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
          if (item && item.deviceId !=null){
            byIds[item.deviceId] = item
            list.push(item.deviceId)
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
      byIds[action.payload.deviceId] = action.payload

      return {
        ...state,
        byIds
      }
    },
    removeCurrent(state,action){
      let id = action.deviceId
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
};
