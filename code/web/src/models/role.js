import {
  queryRoles,
  queryRoleUsers,
  queryRoleUsersWait,
  removeRole,
  addRole,
  updateRole,
  addUserToRole,
  removeUserFromRole,
  confirmUserToRole,
} from '../services/role';

export default {
  namespace: 'role',

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
      const response = yield call(queryRoles, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRole, payload) || {};
      let success = response.code == 0;
      if (success) {
        yield put({
          type: 'saveCurrent',
          payload: response.data,
        });
      }
      if (callback)
        callback({
          roleId: response.data.roleId,
          success,
          message: response.message,
        });
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRole, {
        roleId: Number(payload.roleId),
      });
      let success = response.code == 0;
      if (success) {
        yield put({
          type: 'removeCurrent',
          payload: {
            roleId: payload.roleId,
          },
        });
      }
      if (callback)
        callback({
          roleId: payload.roleId,
          success,
          message: response.message,
        });
    },
    *updateDetail({ payload, callback }, { call, put }) {
      const response = yield call(updateRole, payload);
      let success = response.code == 0;
      if (success) {
        yield put({
          type: 'saveCurrent',
          payload: response.data,
        });
      }
      if (callback)
        callback({
          roleId: payload.roleId,
          success,
          message: response.message,
        });
    },

    *fetchRoleUsers({ payload }, { call, put }) {
      if (!payload || !payload.roleId) {
        console.error('fetchRoleUsers no roleId');
        return;
      }
      const response1 = yield call(queryRoleUsers, payload);
      let success = response1.code == 0;
      let users = [];
      if (success) {
        users = response1.data || [];
        users.forEach(u => {
          u.isSelected = true;
        });
      }

      const response2 = yield call(queryRoleUsersWait, payload);

      if (response2.code == 0) {
        users = users.concat(response2.data || []);
      }
      yield put({
        type: 'saveRoleUsersAll',
        payload: {
          roleId: payload.roleId,
          users,
        },
      });
    },
    *fetchSelectList({ payload }, { call, put }) {
      const response = yield call(queryRoles, payload);
      yield put({
        type: 'saveSelectData',
        payload: {
          ...response,
          pagination: {
            current: payload.pageIndex == null ? 1 : payload.pageIndex + 1,
            pageSize: payload.pageSize || 10,
            total: response.recordCount || 0,
          },
        },
      });
    },
    *setRoleUsers({ payload }, { call, put }) {
      const response = yield call(confirmUserToRole, payload);
      if (response.code == 0) {
        yield put({
          type: 'fetchRoleUsers',
          payload: {
            roleId: payload.roleId,
          },
        });
      } else {
        yield put({
          type: 'fetchRoleUsers',
          payload: {
            roleId: payload.roleId,
          },
        });
      }
    },
  },

  reducers: {
    saveSelectData(state, action) {
      let byIds = {},
        list = [];
      if (action.payload.data) {
        action.payload.data.forEach(item => {
          if (item && item.roleId != null) {
            byIds[item.roleId] = item;
            if (list.indexOf(item.roleId) === -1) {
              list.push(item.roleId);
            }
          }
        });
      }

      return {
        ...state,
        selectData: {
          list,
          pagination: action.payload.pagination,
          byIds,
        },
      };
    },
    saveRoleUsersAll(state, action) {
      if (action.payload.roleId != null) {
        let byIds = Object.assign({}, state.byIds);
        if (byIds[action.payload.roleId]) {
          byIds[action.payload.roleId].users = action.payload.users || [];
          return {
            ...state,
            byIds,
          };
        }
      }
      return state;
    },
    save(state, action) {
      let byIds = {},
        list = [];
      if (action.payload.data) {
        action.payload.data.forEach(item => {
          if (item && item.roleId != null) {
            byIds[item.roleId] = item;
            if (list.indexOf(item.roleId) === -1) {
              list.push(item.roleId);
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
      byIds[action.payload.roleId] = action.payload;

      return {
        ...state,
        byIds,
      };
    },
    removeCurrent(state, action) {
      let id = action.roleId;
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
