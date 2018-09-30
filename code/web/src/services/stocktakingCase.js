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

export async function queryStocktakingDetail(params) {
  return request(`${httpDomain}/stock_tk_case/getStockTKInfo`, {
    method: 'POST',
    body: getFormData(params),
  });
}
