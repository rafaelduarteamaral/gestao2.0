import request from '@/utils/request'

export function all(query) {
  return request({
    url: 'admin/aliquotas',
    method: 'get',
    params: query
  })
}

export function find(id) {
  return request({
    url: `admin/aliquotas/${parseInt(id)}`,
    method: 'get'
  })
}

export function save(aliquota) {
  const method = aliquota.id ? 'put' : 'post'
  return request({
    url: `admin/aliquotas${aliquota.id ? '/' + parseInt(aliquota.id) : ''}`,
    method,
    data: aliquota
  })
}

export function destroy(id) {
  return request({
    url: `admin/aliquotas/${parseInt(id)}`,
    method: 'delete'
  })
}
