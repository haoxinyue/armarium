import { httpDomain, httpDomain_TEST, getFormData } from './api';
import request from '../utils/request';

export async function queryHospitals(params = {}) {
  // return request(`${httpDomain_TEST}/device?${stringify(params)}`);

  // return request(`${httpDomain_TEST}/hospital/getHospitalList`,{
  return request(`${httpDomain}/common/getHosptList`, {
    method: 'POST',
    body: getFormData(params),
  });
  // return request(`${httpDomain_TEST}/equip/getHospitalList`,{
  //   method:'POST',
  //   body:getFormData(params)
  // });
}

export async function removeHospital(params) {
  return request(`${httpDomain_TEST}/hospital`, {
    method: 'POST',
    body: getFormData({
      ...params,
      method: 'delete',
    }),
  });
}

export async function addHospital(params) {
  return request(`${httpDomain}/equip/addHospital`, {
    method: 'POST',
    body: getFormData({
      ...params,
    }),
  });
}
export async function updateHospital(params) {
  return request(`${httpDomain}/equip/updHospital`, {
    method: 'POST',
    body: getFormData({
      ...params,
    }),
  });
}

export async function queryHospitalDetail(params) {
  return request(`${httpDomain}/equip/getHospital`, {
    method: 'POST',
    body: getFormData(params),
  });
}
