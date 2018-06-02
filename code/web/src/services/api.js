import { stringify } from 'qs';
import request from '../utils/request';

const USE_FAKE= false;

const IS_DEBUG = true;

const httpDomain = IS_DEBUG ? "/API":"http://47.100.198.255:8080";
const httpDomain_TEST =  "/api";

export const uploadUrl = `${httpDomain}/accessory/fileUpload`

function getFormData(params) {
  let data = new FormData();
  for (let key in params){
    data.append(key,params[key])
  }
  return data;
}

/* device */
export async function queryDevices(params) {
  // return request(`${httpDomain_TEST}/device?${stringify(params)}`);

    return request(`${httpDomain}/equip/getDeviceList`,{
      method:'POST',
      body:getFormData(params)
    });
    // return request(`${httpDomain_TEST}/equip/getDeviceList`,{
    //   method:'POST',
    //   body:getFormData(params)
    // });
}

export async function removeDevice(params) {
  return request(`${httpDomain_TEST}/device`, {
    method: 'POST',
    body: getFormData({
      ...params,
      method: 'delete',
    }),
  });
}

export async function addDevice(params) {
  return request(`${httpDomain}/equip/addDevice`, {
    method: 'POST',
    body: getFormData({
      ...params
    })
  });
}
export async function updateDevice(params) {

  return request(`${httpDomain}/equip/updDevice`, {
    method: 'POST',
    body: getFormData({
      ...params
    }),
  });
}

export async function queryDeviceDetail(params) {
  return request(`${httpDomain}/equip/getDevice`,{
    method:"POST",
    body:getFormData(params)
  });

}


/* user */

export async function fakeAccountLogin(params) {

  return request(`${httpDomain_TEST}/login/account`,{
    method: 'POST',
    body: {
      userName:params.loginName,
      password:params.password,
      type:'account'
    },
  })

  /*return request(`${httpDomain}/auth/login`, {
    method: 'POST',
    body: getFormData(params),
  });*/
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
