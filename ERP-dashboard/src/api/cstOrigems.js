import request from '@/utils/request'

export function all(query) {
  return request({
    url: 'admin/cstOrigems',
    method: 'get',
    params: query
  })
}

export function find(id) {
  return request({
    url: `admin/cstOrigems/${parseInt(id)}`,
    method: 'get'
  })
}

export function save(cstOrigem) {
  const method = cstOrigem.id ? 'put' : 'post'
  return request({
    url: `admin/cstOrigems${cstOrigem.id ? '/' + parseInt(cstOrigem.id) : ''}`,
    method,
    data: cstOrigem
  })
}

export function destroy(id) {
  return request({
    url: `admin/cstOrigems/${parseInt(id)}`,
    method: 'delete'
  })
}
