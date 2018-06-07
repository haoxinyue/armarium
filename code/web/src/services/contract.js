


import {httpDomain,httpDomain_TEST,getFormData} from "./api";
import request from "../utils/request";

export async function queryContracts(params) {

  return request(`${httpDomain}/contract/getContractList`,{
    method:'POST',
    body:getFormData(params)
  });

}

export async function removeContract(params) {
  return request(`${httpDomain}/contract/delContract`, {
    method: 'POST',
    body: getFormData({
      ...params
    }),
  });
}

export async function addContract(params) {
  return request(`${httpDomain}/contract/addContractInfo`, {
    method: 'POST',
    body: getFormData({
      ...params
    })
  });
}
export async function updateContract(params) {

  return request(`${httpDomain}/contract/updContractInfo`, {
    method: 'POST',
    body: getFormData({
      ...params
    }),
  });
}

export async function queryContractDetail(params) {
  return request(`${httpDomain}/contract/getContractInfo`,{
    method:"POST",
    body:getFormData(params)
  });

}
