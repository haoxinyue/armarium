import {
  queryMtCaseCount,
  queryMtCaseDetail,
  queryMtCaseList,
  updateMtCase,
  addMtCase,
  removeMtCase,
  closeMtCase,
  queryMtCaseTimeShaft,
} from '../services/repair';

export default {
  namespace: 'repair',

  state: {
    list: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    byIds: {},
    currentDetail: null,
  },

  effects: {
    *fetchCount({ payload }, { call, put }) {
      const response = yield call(queryMtCaseCount, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryMtCaseList, payload);
      yield put({
        type: 'save',
        payload:{
          ...response,
          pagination: {
            current: payload.pageIndex == null ? 1 : payload.pageIndex + 1,
            pageSize: payload.pageSize || 10,
            total: response.recordCount || 0,
          },
        }
      });
    },
    *fetchDetail({ payload, callback }, { call, put }) {
      const response = yield call(queryMtCaseDetail, {
        caseId: Number(payload.caseId),
      });
      const timeResponse = yield call(queryMtCaseTimeShaft, {
        caseId: Number(payload.caseId),
      });
      const data = {
        ...response.data,
        timeShaft: (timeResponse && timeResponse.data) || [],
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
      const response = yield call(addMtCase, payload) || {};
      yield put({
        type: 'saveCurrent',
        payload: response.data,
      });
      if (callback) callback(response.code === 0);
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeMtCase, payload);
      yield put({
        type: 'removeCurrent',
        payload: {
          caseId: payload.caseId,
        },
      });
      if (callback) callback(response);
    },
    *changeState({ payload, callback }, { call, put }) {
      let response;
      if (payload.caseState === 50||payload.caseState === 40) {
        response = yield call(closeMtCase, {
          ...payload,
        }) || {};
      } else {
        response = yield call(updateMtCase, {
          ...payload,
        }) || {};
      }

      let success = response.code === 0;
      if (success) {
        yield put({
          type: 'saveCurrent',
          payload: response.data,
        });
      }
      if (callback) callback(success);
    },
    *closeCase({ payload, callback }, { call, put }) {
      const response = yield call(closeMtCase, {
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
      const response = yield call(updateMtCase, payload);
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
