import request from '@/utils/request'

export function all(query) {
  return request({
    url: 'admin/cstTributacaos',
    method: 'get',
    params: query
  })
}

export function find(id) {
  return request({
    url: `admin/cstTributacaos/${parseInt(id)}`,
    method: 'get'
  })
}

export function save(cstTributacoe) {
  const method = cstTributacoe.id ? 'put' : 'post'
  return request({
    url: `admin/cstTributacaos${cstTributacoe.id ? '/' + parseInt(cstTributacoe.id) : ''}`,
    method,
    data: cstTributacoe
  })
}

export function destroy(id) {
  return request({
    url: `admin/cstTributacaos/${parseInt(id)}`,
    method: 'delete'
  })
}
