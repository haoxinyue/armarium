import {queryNotices} from '../services/api';
import {queryMtCaseCount} from '../services/repair';


export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
  },

  effects: {
    * fetchNotices({payload}, {call, put,select}) {
      // const data = yield call(queryNotices);

      let data = [];
      // const user = yield select(state => state.user);
      const user = yield select((state) => state.user)
      // console.log(currentUser)
      if (!user){
        return;
      }

      const assigneeUserId = user&&user.currentUser && user.currentUser.userId;
      const roleName = user&&user.currentUser && user.currentUser.roleName||'调度';

      let caseState = 10;

      switch (roleName){
        case '调度':
          caseState= 10;
          break;
        case '驻场工程师':
          caseState= 30;
          break;
        case '主管':
          caseState= 40;
          break;
      }

      const mtCaseCount = yield call(queryMtCaseCount, {
        assigneeUserId,
        // 报修中（10）：（主要是医护人员干的，当然也有可能是驻场工程师），
        // 已取消（20）：（驻场工程师使用app操作，认为这个报修是误报）
        // 维修处理中（30）：（驻场工程师使用app操作，确认这是一个问题，需要处理）
        // 已关闭（50）：（主管确认关闭，可以使用app，也可以是用web）
        // caseState
      });

      if (mtCaseCount.recordCount) {
        data.push({
          id: new Date().getTime(),
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
          title: `你有 ${mtCaseCount.recordCount} 条新工单等待处理`,
          datetime: '2018-06-12',
          type: 'daiban',
          status: 'todo',
          link: '/repair/repair-list'
        });
      }


      yield put({
        type: 'saveNotices',
        payload: data,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: data.length,
      });
    },
    * clearNotices({payload}, {put, select}) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      yield put({
        type: 'user/changeNotifyCount',
        payload: count,
      });
    },
  },

  reducers: {
    changeLayoutCollapsed(state, {payload}) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, {payload}) {
      return {
        ...state,
        notices: payload,
      };
    },
    saveClearedNotices(state, {payload}) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
  },

  subscriptions: {
    setup({history, dispatch}) {

      dispatch({
        type: 'fetchNotices'
      });

      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({pathname, search}) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
