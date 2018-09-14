import { httpDomain, getFormData } from './api';
import request from '../utils/request';

export async function queryDevices(params) {
  // return request(`${httpDomain_TEST}/device?${stringify(params)}`);

  return request(`${httpDomain}/equip/getDeviceList`, {
    method: 'POST',
    body: getFormData(params),
  });
}

export async function removeDevice(params) {
  return request(`${httpDomain}/equip/delDevice`, {
    method: 'POST',
    body: getFormData(params),
  });
}

export async function addDevice(params) {
  return request(`${httpDomain}/equip/addDevice`, {
    method: 'POST',
    body: getFormData({
      ...params,
    }),
  });
}
export async function updateDevice(params) {
  return request(`${httpDomain}/equip/updDevice`, {
    method: 'POST',
    body: getFormData({
      ...params,
    }),
  });
}

export async function queryDeviceDetail(params) {
  return request(`${httpDomain}/equip/getDevice`, {
    method: 'POST',
    body: getFormData(params),
  });
}

export async function queryDeviceTimeline(params) {
  return request(`${httpDomain}/dev_timeline/getTimelineList`, {
    method: 'POST',
    body: getFormData(params),
  });
}
