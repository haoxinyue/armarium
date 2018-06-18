import { stringify } from 'qs';
import request from '../utils/request';

const USE_FAKE= false;

const IS_DEBUG = true;

export const httpDomain = IS_DEBUG ? "/API":"http://47.100.198.255:8080";
export const httpDomain_TEST =  "/api";

export const uploadUrl = `${httpDomain}/accessory/fileUpload`

export function getFormData(params) {
  let data = new FormData();
  for (let key in params){
    data.append(key,params[key])
  }
  return data;
}



/* user */

export async function fakeAccountLogin(params) {

  // return request(`${httpDomain_TEST}/login/account`,{
  //   method: 'POST',
  //   body: {
  //     userName:params.loginName,
  //     password:params.password,
  //     type:'account'
  //   },
  // })


  return request(`${httpDomain}/auth/login`, {
    method: 'POST',
    body: getFormData({
      loginName:params.loginName,
      loginPassword:params.password
    }),
  });

}

export async function queryUserDetail(params) {

  return request(`${httpDomain}/equip/getDevice`,{
    method:"POST",
    body:getFormData(params)
  });

}

export async function queryUsers(params) {
  return request(`${httpDomain_TEST}/userlist?${stringify(params)}`);
}

export async function removeUser(params) {
  return request(`${httpDomain_TEST}/userlist`, {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addUser(params) {
  return request(`${httpDomain_TEST}/userlist`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}


/* =============================================================== */
export async function queryDepartments(params) {
  return request(`${httpDomain}/dept/getDeptTree`, {
    method: 'POST',
    body: getFormData({
      ...params,
      userId:10002
    }),
  });
}

export async function addDepartment(params) {
  return request(`${httpDomain}/dept/addDept`, {
    method: 'POST',
    body: getFormData(params),
  });
}

export async function removeDepartment(params) {
  return request(`${httpDomain}/dept/delDept`, {
    method: 'POST',
    body: getFormData(params),
  });
}

export async function updateDepartment(params) {
  return request(`${httpDomain}/dept/updDept`, {
    method: 'POST',
    body: getFormData(params),
  });
}

/* =============================================================== */


export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}



export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
