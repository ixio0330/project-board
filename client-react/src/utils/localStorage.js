export function setToken(token) {
  localStorage.setItem('TOKEN', token);
}

export function getToken() {
  return localStorage.getItem('TOKEN') || null;
}

export function removeToken() {
  localStorage.removeItem('TOKEN');
}