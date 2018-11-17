import { httpDomain, getFormData } from './api';
import request from '../utils/request';

export async function queryMtCaseCount(params) {
  return request(`${httpDomain}/case/rotateMtCase`, {
    method: 'POST',
    /*
    *     //assigneeUserId
    * */
    body: getFormData(params),
  });
}

export async function queryMtCaseList(params) {
  return request(`${httpDomain}/case/getMtCaseList`, {
    method: 'POST',
    /*
   *     //assigneeUserId
   * */
    body: getFormData(params),
  });
}

export async function removeMtCase(params) {
  return request(`${httpDomain}/case/delMtCase`, {
    method: 'POST',
    body: getFormData(params),
  });
}

export async function addMtCase(params) {
  return request(`${httpDomain}/case/addMtCase`, {
    method: 'POST',
    body: getFormData({
      ...params,
    }),
  });
}
export async function updateMtCase(params) {
  return request(`${httpDomain}/case/updMtCase`, {
    method: 'POST',
    body: getFormData({
      ...params,
    }),
  });
}
export async function closeMtCase(params) {
  return request(`${httpDomain}/case/closeMtCase`, {
    method: 'POST',
    body: getFormData({
      ...params,
    }),
  });
}

export async function queryMtCaseDetail(params) {
  return request(`${httpDomain}/case/getMtCaseInfo`, {
    method: 'POST',
    body: getFormData(params),
  });
}

export async function queryMtCaseTimeShaft(params) {
  return request(`${httpDomain}/case/getCaseTimeShaft`, {
    method: 'POST',
    body: getFormData(params),
  });
}
