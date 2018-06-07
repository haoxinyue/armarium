import {httpDomain,httpDomain_TEST,getFormData} from "./api";
import request from "../utils/request";

export async function queryAccessories(params) {

  return request(`${httpDomain}/accessory/getAccessoryList`,{
    method:'POST',
    body:getFormData(params)
  });

}

export async function removeAccessory(params) {
  return request(`${httpDomain}/accessory/delAccessory`, {
    method: 'POST',
    body: getFormData({
      ...params
    }),
  });
}

export async function addAccessory(params) {
  return request(`${httpDomain}/accessory/addAccessoryInfo`, {
    method: 'POST',
    body: getFormData({
      ...params
    })
  });
}
export async function updateAccessory(params) {

  return request(`${httpDomain}/accessory/updAccessoryInfo`, {
    method: 'POST',
    body: getFormData({
      ...params
    }),
  });
}

export async function queryAccessoryDetail(params) {
  return request(`${httpDomain}/accessory/getAccessoryInfo`,{
    method:"POST",
    body:getFormData(params)
  });

}
