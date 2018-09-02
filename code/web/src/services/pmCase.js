import { httpDomain, getFormData } from './api';
import request from '../utils/request';

export async function queryPmCaseList(params) {
  return request(`${httpDomain}/pm_case/getPmCaseList`, {
    method: 'POST',
    /*
   *     //assigneeUserId
   * */
    body: getFormData(params),
  });
}

export async function compeletePmCase(params) {
  return request(`${httpDomain}/pm_case/completePmCase`, {
    method: 'POST',
    body: getFormData(params),
  });
}

export async function addPmCase(params) {
  return request(`${httpDomain}/pm_case/addPmCase`, {
    method: 'POST',
    body: getFormData({
      ...params,
    }),
  });
}

export async function queryPmCaseDetail(params) {
  return request(`${httpDomain}/pm_case/getPmCaseInfo`, {
    method: 'POST',
    body: getFormData(params),
  });
}
