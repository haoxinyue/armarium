import {queryDepartments, removeDepartment, addDepartment, updateDepartment} from '../services/api';


function get2RootPath(item, list, byIds) {
  let idx = list.indexOf(item);
  let pIdx = list.indexOf(byIds[item.parentDeptId]);

  if (idx >= 0 && pIdx >= 0) {
    let spath = get2RootPath(byIds[item.parentDeptId], list, byIds)
    spath.unshift(item.deptId)
    return spath;
  } else {
    return [item.deptId]
  }

}


function generateTree(list, byIds) {
  let tree = [];
  let loadedList = [];
  for (let i = 0; i < list.length; i++) {
    //计算到达根节点的路径
    let spath = get2RootPath(list[i], list, byIds).reverse(), pNode;
    //填充到树中去
    spath.forEach((deptId, i) => {
      if (!pNode) {
        if (loadedList.indexOf(deptId) !== -1) {
          pNode =tree.filter((d)=>d.deptId === deptId)[0]
        }else{
          let node = {
            deptId: deptId,
            children: [],
          };
          tree.push(node);
          loadedList.push(deptId);
          pNode = node;
        }
      }else{
        if (loadedList.indexOf(deptId) !== -1) {
          pNode =pNode.children.filter((d)=>d.deptId === deptId)[0]
        }else{
          loadedList.push(deptId);
          let node = {
            deptId: deptId,
            children: [],
          };
          pNode.children.push(node)
          pNode = node;
        }
      }
    })


  }
  return tree

}


export default {
  namespace: 'department',

  state: {
    list: [],
    pagination: {},
    byIds: {},
    tree: []
  },

  effects: {
    * fetch({payload,cache}, {select,call, put}) {

      const response = yield call(queryDepartments, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * add({payload, callback}, {call, put}) {
      const response = yield call(addDepartment, payload);
      const success = response.code == 0
      if (success){
        yield put({
          type: 'saveCurrent',
          payload: {
            ...response
          }
        });
      }

      // yield call(callback,{
      //   success
      // })

      if (callback) callback({
        success
      });

    },
    * remove({payload, callback}, {call, put}) {
      const response = yield call(removeDepartment, payload);
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
      if (callback) callback();
    },
    * update({payload, callback}, {call, put}) {
      const response = yield call(updateDepartment, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      let byIds = {}
      let list = []
      action.payload.data.forEach((item) => {
        if (item && item.deptId != null) {
          byIds[item.deptId] = item
          list.push(item.deptId)
        }
      });
      let tree = generateTree(action.payload.data, byIds);


      return {
        ...state,
        list,
        pagination: {
          total: action.payload.recordCount
        },
        byIds,
        tree
      };
    }
  },
};
