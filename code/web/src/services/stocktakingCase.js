import { httpDomain, getFormData } from './api';
import request from '../utils/request';

export async function queryStocktakingCaseList(params) {
  return request(`${httpDomain}/stock_tk_case/getStockTKCaseList`, {
    method: 'POST',
    /*
   *     //assigneeUserId
   * */
    body: getFormData(params),
  });
}
export async function updStockTKCaseState(params) {
  return request(`${httpDomain}/stock_tk_case/updStockTKCaseState`, {
    method: 'POST',
    /*
   *     //assigneeUserId
   * */
    body: getFormData(params),
  });
}

export async function compeleteStocktaking(params) {
  return request(`${httpDomain}/stock_tk_case/updStockTKCase`, {
    method: 'POST',
    body: getFormData(params),
  });
}

export async function addStocktaking(params) {
  return request(`${httpDomain}/stock_tk_case/addStockTKCase`, {
    method: 'POST',
    body: getFormData({
      ...params,
    }),
  });
}
export async function removeStocktaking(params) {
  return request(`${httpDomain}/stock_tk_case/delStockTKCase`, {
    method: 'POST',
    body: getFormData({
      ...params,
    }),
  });
}

export async function queryStocktakingDetail(params) {
  return request(`${httpDomain}/stock_tk_case/getStockTKDevice`, {
    method: 'POST',
    body: getFormData(params),
  });
}

export async function queryStocktakingDeviceList(params) {
  return request(`${httpDomain}/stock_tk_case/getStockTKDeviceList`, {
    method: 'POST',
    body: getFormData(params),
  });
}
