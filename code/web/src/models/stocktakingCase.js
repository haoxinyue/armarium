import {
  queryStocktakingDetail,
  queryStocktakingCaseList,
  addStocktaking,
  compeleteStocktaking,
} from '../services/stocktakingCase.js';

export default {
  namespace: 'stocktakingCase',

  state: {
    list: [],
    pagination: {},
    byIds: {},
    currentDetail: null,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryStocktakingCaseList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchDetail({ payload, callback }, { call, put }) {
      const response = yield call(queryStocktakingDetail, {
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
    *add({ payload }, { call, put }) {
      const response = yield call(addStocktaking, payload) || {};
      let success = response.code == 0;
      if (success) {
        yield put({
          type: 'saveCurrent',
          payload: response.data,
        });
      }

      return success;
    },
    *complete({ payload, callback }, { call, put }) {
      const response = yield call(compeleteStocktaking, payload) || {};
      yield put({
        type: 'saveCurrent',
        payload: response.data,
      });
      if (callback) callback(response.code === 0);
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
