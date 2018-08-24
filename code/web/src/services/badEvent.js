import { httpDomain, getFormData } from './api';
import request from '../utils/request';

export async function queryBadEventList(params) {
  return request(`${httpDomain}/bad_event/getBadEventList`, {
    method: 'POST',
    /*
   *     //assigneeUserId
   * */
    body: getFormData(params),
  });
}

export async function removeBadEvent(params) {
  return request(`${httpDomain}/bad_event/removeBadEvent`, {
    method: 'POST',
    body: getFormData(params),
  });
}

export async function addBadEvent(params) {
  return request(`${httpDomain}/bad_event/addBadEvent`, {
    method: 'POST',
    body: getFormData({
      ...params,
    }),
  });
}
export async function updateBadEvent(params) {
  return request(`${httpDomain}/bad_event/updBadEvent`, {
    method: 'POST',
    body: getFormData({
      ...params,
    }),
  });
}

export async function queryBadEventDetail(params) {
  return request(`${httpDomain}/bad_event/getBadEventInfo`, {
    method: 'POST',
    body: getFormData(params),
  });
}
