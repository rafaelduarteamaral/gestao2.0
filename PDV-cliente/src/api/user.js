import request from '@/utils/request'

export function getUser() {
  return request({
    url: 'me',
    method: 'get'
  })
}

export function checkout(items) {
  return request({
    url: 'orders',
    method: 'post',
    data: { items }
  })
}
