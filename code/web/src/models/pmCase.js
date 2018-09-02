import {
  queryPmCaseDetail,
  queryPmCaseList,
  compeleteInspectionCase, compeletePmCase,
} from '../services/pmCase';

export default {
  namespace: 'pmCase',

  state: {
    list: [],
    pagination: {},
    byIds: {},
    currentDetail: null,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryPmCaseList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchDetail({ payload, callback }, { call, put }) {
      const response = yield call(queryPmCaseDetail, {
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

    *complete({ payload, callback }, { call, put }) {
      const response = yield call(compeletePmCase, payload) || {};
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
