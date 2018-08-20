import { httpDomain, getFormData } from './api';
import request from '../utils/request';

export async function queryInstallCaseList(params) {
  return request(`${httpDomain}/install_case/getInsCaseList`, {
    method: 'POST',
    /*
   *     //assigneeUserId
   * */
    body: getFormData(params),
  });
}

export async function compeleteInstallCase(params) {
  return request(`${httpDomain}/install_case/completeInsCase`, {
    method: 'POST',
    body: getFormData(params),
  });
}

export async function addInstallCase(params) {
  return request(`${httpDomain}/install_case/addInsCase`, {
    method: 'POST',
    body: getFormData({
      ...params,
    }),
  });
}
export async function closeInstallCase(params) {
  return request(`${httpDomain}/install_case/closeInsCase`, {
    method: 'POST',
    body: getFormData({
      ...params,
    }),
  });
}

export async function queryInstallCaseDetail(params) {
  return request(`${httpDomain}/install_case/getInsCaseInfo`, {
    method: 'POST',
    body: getFormData(params),
  });
}
