import {
  queryBadEventDetail,
  queryBadEventList,
  updateBadEvent,
  addBadEvent,
  removeBadEvent,
} from '../services/badEvent';

export default {
  namespace: 'badEvent',

  state: {
    list: [],
    pagination: {},
    byIds: {},
    currentDetail: null,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryBadEventList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchDetail({ payload, callback }, { call, put }) {
      const response = yield call(queryBadEventDetail, {
        eventId: Number(payload.eventId),
      });

      const data = {
        ...response.data,
      };
      yield put({
        type: 'saveCurrent',
        payload: {
          ...data,
        },
      });
      const res = {
        success: response.code === 0,
        data: response.data,
      };
      return res;
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addBadEvent, payload) || {};
      yield put({
        type: 'saveCurrent',
        payload: response.data,
      });
      const result = {
        success: response.code === 0,
      };
      return result;
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeBadEvent, payload);
      yield put({
        type: 'removeCurrent',
        payload: {
          eventId: payload.eventId,
        },
      });
      if (callback) callback(response);
    },
    *updateDetail({ payload, callback }, { call, put }) {
      const response = yield call(updateBadEvent, payload);
      yield put({
        type: 'saveCurrent',
        payload: response.data,
      });
      const result = {
        success: response.code === 0,
      };
      return result;
    },
  },

  reducers: {
    save(state, action) {
      let byIds = {},
        list = [];
      if (action.payload.data) {
        action.payload.data.forEach(item => {
          if (item && item.eventId != null) {
            byIds[item.eventId] = item;
            if (list.indexOf(item.eventId) === -1) {
              list.push(item.eventId);
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
      byIds[action.payload.eventId] = action.payload;

      return {
        ...state,
        byIds,
      };
    },
    removeCurrent(state, action) {
      let id = action.eventId;
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

  subscriptions: {
    setup({ dispatch }) {},
  },
};
