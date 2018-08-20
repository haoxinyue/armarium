import { httpDomain, getFormData } from './api';
import request from '../utils/request';

export async function queryRoles(params) {
  return request(`${httpDomain}/auth/getRoleList`, {
    method: 'POST',
    body: getFormData(params),
  });
}

export async function removeRole(params) {
  return request(`${httpDomain}/auth/delRole`, {
    method: 'POST',
    body: getFormData(params),
  });
}

export async function addRole(params) {
  return request(`${httpDomain}/auth/addRole`, {
    method: 'POST',
    body: getFormData({
      ...params,
    }),
  });
}
export async function updateRole(params) {
  return request(`${httpDomain}/auth/updRole`, {
    method: 'POST',
    body: getFormData({
      ...params,
    }),
  });
}

export async function queryRoleUsers(params) {
  return request(`${httpDomain}/auth/getUsersWithRole`, {
    method: 'POST',
    body: getFormData(params),
  });
}

export async function queryRoleUsersWait(params) {
  return request(`${httpDomain}/auth/getUsersWithoutRole`, {
    method: 'POST',
    body: getFormData(params),
  });
}

export async function addUserToRole(params) {
  return request(`${httpDomain}/auth/addUserToRole`, {
    method: 'POST',
    body: getFormData(params),
  });
}

export async function removeUserFromRole(params) {
  return request(`${httpDomain}/auth/deleteUserFromRole`, {
    method: 'POST',
    body: getFormData(params),
  });
}
export async function confirmUserToRole(params) {
  let roleId = params.roleId;
  let users = params.users || [];
  let creater = params.creater;
  let data = {
    roleId,
    creater,
    users: [],
  };
  users.forEach(u => {
    data.users.push({ userId: u });
  });
  // data.users=JSON.stringify(data.users);

  return request(`${httpDomain}/auth/confirmUserToRole`, {
    method: 'POST',
    body: data,
  });
}
