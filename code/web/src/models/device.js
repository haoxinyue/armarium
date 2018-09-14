import {
  queryDevices,
  queryDeviceDetail,
  removeDevice,
  addDevice,
  updateDevice,
  queryDeviceTimeline,
} from '../services/device';

export default {
  namespace: 'device',

  state: {
    list: [],
    pagination: {},
    byIds: {},
    selectData: {
      list: [],
      byIds: {},
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryDevices, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchDetail({ payload, callback }, { call, put }) {
      const response = yield call(queryDeviceDetail, {
        deviceId: Number(payload.deviceId),
      });

      const response2 = yield call(queryDeviceTimeline, {
        deviceId: Number(payload.deviceId),
      });

      yield put({
        type: 'saveCurrent',
        payload: {
          ...response.data,
          timeline: response2.data,
        },
      });

      if (callback) callback(response.data);
    },
    *fetchTimeline({ payload, callback }, { call, put }) {
      const response = yield call(queryDeviceTimeline, {
        deviceId: Number(payload.deviceId),
      });
      yield put({
        type: 'saveTimeline',
        payload: {
          deviceId: Number(payload.deviceId),
          ...response.data,
        },
      });
      if (callback) callback(response.data);
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addDevice, payload) || {};
      let success = response.code == 0;
      if (success) {
        yield put({
          type: 'saveCurrent',
          payload: response.data,
        });
      }
      if (callback)
        callback({
          deviceId: response.data.deviceId,
          success,
          message: response.message,
        });
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeDevice, {
        deviceId: Number(payload.deviceId),
      });
      let success = response.code == 0;
      if (success) {
        yield put({
          type: 'removeCurrent',
          payload: {
            deviceId: payload.deviceId,
          },
        });
      }
      if (callback)
        callback({
          deviceId: payload.deviceId,
          success,
          message: response.message,
        });
    },
    *updateDetail({ payload, callback }, { call, put }) {
      const response = yield call(updateDevice, payload);
      let success = response.code == 0;
      if (success) {
        yield put({
          type: 'saveCurrent',
          payload: response.data,
        });
      }
      if (callback)
        callback({
          deviceId: payload.deviceId,
          success,
          message: response.message,
        });
    },

    *fetchSelectList({ payload }, { call, put }) {
      const response = yield call(queryDevices, payload);
      yield put({
        type: 'saveSelectData',
        payload: response,
      });
    },
  },

  reducers: {
    saveSelectData(state, action) {
      let byIds = {},
        list = [];
      if (action.payload.data) {
        action.payload.data.forEach(item => {
          if (item && item.deviceId != null) {
            byIds[item.deviceId] = item;
            if (list.indexOf(item.deviceId) === -1) {
              list.push(item.deviceId);
            }
          }
        });
      }

      return {
        ...state,
        selectData: {
          list,
          pagination: {
            total: action.payload.recordCount,
          },
          byIds,
        },
      };
    },

    save(state, action) {
      let byIds = {},
        list = [];
      if (action.payload.data) {
        action.payload.data.forEach(item => {
          if (item && item.deviceId != null) {
            byIds[item.deviceId] = item;
            if (list.indexOf(item.deviceId) === -1) {
              list.push(item.deviceId);
            }
          }
        });
      }

      return {
        ...state,
        list,
        pagination: {
          total: action.payload.recordCount,
        },
        byIds,
      };
    },
    saveCurrent(state, action) {
      if (!action.payload) {
        return {
          ...state,
        };
      }
      let byIds = Object.assign({}, state.byIds);
      byIds[action.payload.deviceId] = action.payload;

      return {
        ...state,
        byIds,
      };
    },
    saveTimeline(state, action) {
      if (!action.payload || !action.payload.deviceId) {
        return {
          ...state,
        };
      }
      let byIds = Object.assign({}, state.byIds);
      byIds[action.payload.deviceId].timeline = action.payload.data;

      return {
        ...state,
        byIds,
      };
    },
    removeCurrent(state, action) {
      let id = action.deviceId;
      let idx = state.list.indexOf(id);
      state.list.splice(idx, 1);
      let list = state.list;
      let byIds = state.byIds;
      delete byIds[id];

      return {
        ...state,
        list,
        byIds,
      };
    },
  },
};
