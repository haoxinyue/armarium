// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return localStorage.getItem('yl-authority') || 'admin';
}

export function setAuthority(authority) {
  return localStorage.setItem('yl-authority', authority);
}


export function getCurrentUser() {
  let ustr = localStorage.getItem('yl-user-current')
  return  ustr&& JSON.parse(ustr);
}
export function setCurrentUser(user) {
  return localStorage.setItem('yl-user-current', JSON.stringify(user));
}


