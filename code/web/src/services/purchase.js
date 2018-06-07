import {httpDomain,httpDomain_TEST,getFormData} from "./api";
import request from "../utils/request";

export async function queryPurchases(params) {

  return request(`${httpDomain}/purchase/getPurchaseList`,{
    method:'POST',
    body:getFormData(params)
  });

}

export async function removePurchase(params) {
  return request(`${httpDomain}/purchase/delPurchase`, {
    method: 'POST',
    body: getFormData({
      ...params
    }),
  });
}

export async function addPurchase(params) {
  return request(`${httpDomain}/purchase/addPurchaseInfo`, {
    method: 'POST',
    body: getFormData({
      ...params
    })
  });
}
export async function updatePurchase(params) {

  return request(`${httpDomain}/purchase/updPurchaseInfo`, {
    method: 'POST',
    body: getFormData({
      ...params
    }),
  });
}

export async function queryPurchaseDetail(params) {
  return request(`${httpDomain}/purchase/getPurchaseInfo`,{
    method:"POST",
    body:getFormData(params)
  });

}
