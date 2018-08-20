import { queryEngineerList } from '../services/engineer';

export default {
  namespace: 'engineer',

  state: {
    list: [],
    pagination: {},
    byIds: {},
    currentDetail: null,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryEngineerList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      let byIds = {},
        list = [];
      if (action.payload.data) {
        action.payload.data.forEach(item => {
          if (item && item.userId != null) {
            byIds[item.userId] = item;
            if (list.indexOf(item.userId) === -1) {
              list.push(item.userId);
            }
          }
        });
      }

      return {
        ...state,
        list,
        pagination: {
          total: action.payload.recordCount || list.length,
        },
        byIds,
      };
    },
  },

  subscriptions: {
    setup({ dispatch }) {
      // dispatch('fetch')
    },
  },
};
