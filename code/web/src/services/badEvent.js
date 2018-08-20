import { httpDomain, getFormData } from './api';
import request from '../utils/request';

export async function queryBadEventList(params) {
  return request(`${httpDomain}/case/getMtCaseList`, {
    method: 'POST',
    /*
   *     //assigneeUserId
   * */
    body: getFormData(params),
  });
}

export async function removeBadEvent(params) {
  return request(`${httpDomain}/case/delMtCase`, {
    method: 'POST',
    body: getFormData(params),
  });
}

export async function addBadEvent(params) {
  return request(`${httpDomain}/case/addMtCase`, {
    method: 'POST',
    body: getFormData({
      ...params,
    }),
  });
}
export async function updateBadEvent(params) {
  return request(`${httpDomain}/case/updMtCase`, {
    method: 'POST',
    body: getFormData({
      ...params,
    }),
  });
}

export async function queryBadEventDetail(params) {
  return request(`${httpDomain}/case/getMtCaseInfo`, {
    method: 'POST',
    body: getFormData(params),
  });
}
