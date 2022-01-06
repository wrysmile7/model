import Cookies from 'js-cookie'

// 将token存在了cookie中
const TokenKey = 'token' + sessionStorage.username

export function getToken () {
  return Cookies.get(TokenKey)
  // return localStorage.getItem(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
  // return localStorage.setItem(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
  // return localStorage.removeItem(TokenKey)
}
