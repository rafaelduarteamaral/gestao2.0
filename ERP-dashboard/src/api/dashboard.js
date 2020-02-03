import request from '@/utils/request'

export function load(params) {
  return request({
    url: 'admin/dashboard',
    method: 'get',
    params
  })
}
