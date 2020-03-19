import request from '@/utils/request'

export function all(query) {
  return request({
    url: 'admin/cfops',
    method: 'get',
    params: query
  })
}

export function find(id) {
  return request({
    url: `admin/cfops/${parseInt(id)}`,
    method: 'get'
  })
}

export function save(cfop) {
  const method = cfop.id ? 'put' : 'post'
  return request({
    url: `admin/cfops${cfop.id ? '/' + parseInt(cfop.id) : ''}`,
    method,
    data: cfop
  })
}

export function destroy(id) {
  return request({
    url: `admin/cfops/${parseInt(id)}`,
    method: 'delete'
  })
}
