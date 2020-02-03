import Cookies from 'js-cookie'

const TokenKey = 'client-token'
const RefreshTokenKey = 'client-refresh-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setRefreshToken(refreshtoken) {
  return Cookies.set(RefreshTokenKey, refreshtoken)
}

export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey)
}

export function removeRefreshToken() {
  return Cookies.remove(RefreshTokenKey)
}
