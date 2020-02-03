import request from '@/utils/request'

export function fetch(query) {
  return request({
    url: 'products',
    method: 'get',
    params: query
  })
}
