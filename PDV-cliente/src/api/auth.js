import request from '@/utils/request'

export function register(user) {
  return request({
    url: '/auth/register',
    method: 'post',
    data: user
  })
}

export function login(email, password) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: { email, password }
  })
}

export function logout(refresh_token) {
  return request({
    url: '/auth/logout',
    method: 'post',
    data: { refresh_token }
  })
}
