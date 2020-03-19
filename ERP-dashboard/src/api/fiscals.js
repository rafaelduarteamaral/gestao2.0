import request from '@/utils/request'

export function all(query) {
  return request({
    url: 'admin/fiscals',
    method: 'get',
    params: query
  })
}

export function find(id) {
  return request({
    url: `admin/fiscals/${parseInt(id)}`,
    method: 'get'
  })
}

export function save(fiscal) {
  const method = fiscal.id ? 'put' : 'post'
  return request({
    url: `admin/fiscals${fiscal.id ? '/' + parseInt(fiscal.id) : ''}`,
    method,
    data: fiscal
  })
}

export function destroy(id) {
  return request({
    url: `admin/fiscals/${parseInt(id)}`,
    method: 'delete'
  })
}
