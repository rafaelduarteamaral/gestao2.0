import request from '@/utils/request'

export function all(query) {
  return request({
    url: 'admin/ncms',
    method: 'get',
    params: query
  })
}

export function find(id) {
  return request({
    url: `admin/ncms/${parseInt(id)}`,
    method: 'get'
  })
}

export function save(ncm) {
  const method = ncm.id ? 'put' : 'post'
  return request({
    url: `admin/ncms${ncm.id ? '/' + parseInt(ncm.id) : ''}`,
    method,
    data: ncm
  })
}

export function destroy(id) {
  return request({
    url: `admin/ncms/${parseInt(id)}`,
    method: 'delete'
  })
}
