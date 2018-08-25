import { httpDomain, getFormData } from './api';
import request from '../utils/request';

export async function queryInspectionCaseList(params) {
  return request(`${httpDomain}/insp_case/getInspCaseList`, {
    method: 'POST',
    /*
   *     //assigneeUserId
   * */
    body: getFormData(params),
  });
}

export async function compeleteInspectionCase(params) {
  return request(`${httpDomain}/insp_case/completeInspCase`, {
    method: 'POST',
    body: getFormData(params),
  });
}

export async function addInspectionCase(params) {
  return request(`${httpDomain}/insp_case/addInspCase`, {
    method: 'POST',
    body: getFormData({
      ...params,
    }),
  });
}
export async function closeInspectionCase(params) {
  return request(`${httpDomain}/insp_case/closeInspCase`, {
    method: 'POST',
    body: getFormData({
      ...params,
    }),
  });
}

export async function queryInspectionCaseDetail(params) {
  return request(`${httpDomain}/insp_case/getInspCaseInfo`, {
    method: 'POST',
    body: getFormData(params),
  });
}
