import { httpDomain, getFormData } from './api';
import request from '../utils/request';

export async function queryEngineerList(params) {
  return request(`${httpDomain}/auth/getEngineerList`, {
    method: 'POST',
    /*
   *
   * */
    body: getFormData(params),
  });
}
