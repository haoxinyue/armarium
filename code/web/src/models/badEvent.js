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
        caseId: Number(payload.caseId),
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
      if (callback) callback(response.data);
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addBadEvent, payload) || {};
      yield put({
        type: 'saveCurrent',
        payload: response.data,
      });
      if (callback) callback(response.code === 0);
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeBadEvent, payload);
      yield put({
        type: 'removeCurrent',
        payload: {
          caseId: payload.caseId,
        },
      });
      if (callback) callback(response);
    },
    *changeState({ payload, callback }, { call, put }) {
      const response = yield call(updateBadEvent, {
        ...payload,
      }) || {};
      let success = response.code === 0;
      if (success) {
        yield put({
          type: 'saveCurrent',
          payload: response.data,
        });
      }
      if (callback) callback(success);
    },
    *updateDetail({ payload, callback }, { call, put }) {
      const response = yield call(updateBadEvent, payload);
      yield put({
        type: 'saveCurrent',
        payload: response.data,
      });
      if (callback) callback(response);
    },
  },

  reducers: {
    save(state, action) {
      let byIds = {},
        list = [];
      if (action.payload.data) {
        action.payload.data.forEach(item => {
          if (item && item.caseId != null) {
            byIds[item.caseId] = item;
            if (list.indexOf(item.caseId) === -1) {
              list.push(item.caseId);
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
      byIds[action.payload.caseId] = action.payload;

      return {
        ...state,
        byIds,
      };
    },
    removeCurrent(state, action) {
      let id = action.caseId;
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
