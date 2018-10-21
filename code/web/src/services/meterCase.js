import { httpDomain, getFormData } from './api';
import request from '../utils/request';

export async function queryMeterCaseList(params) {
  return request(`${httpDomain}/meter_case/getMeterCaseInfos`, {
    method: 'POST',
    /*
   *     //assigneeUserId
   * */
    body: getFormData(params),
  });
}

export async function updAssignPersonMeterCase(params) {
  return request(`${httpDomain}/meter_case/updAssignPersonMeterCase`, {
    method: 'POST',
    body: getFormData(params),
  });
}

export async function completeMeterCase(params) {
  return request(`${httpDomain}/meter_case/completeMeterCase`, {
    method: 'POST',
    body: getFormData(params),
  });
}

export async function queryMeterCaseDetail(params) {
  return request(`${httpDomain}/meter_case/getMeterCaseInfo`, {
    method: 'POST',
    body: getFormData(params),
  });
}
