import request from '@/utils/request'

export function all(query) {
  return request({
    url: 'admin/tipoDocumento',
    method: 'get',
    params: query
  })
}

export function find(id) {
  return request({
    url: `admin/tipoDocumento/${parseInt(id)}`,
    method: 'get'
  })
}

export function save(tipoDocumento) {
  const method = tipoDocumento.id ? 'put' : 'post'
  return request({
    url: `admin/tipoDocumento${tipoDocumento.id ? '/' + parseInt(tipoDocumento.id) : ''}`,
    method,
    data: tipoDocumento
  })
}

export function destroy(id) {
  return request({
    url: `admin/tipoDocumento/${parseInt(id)}`,
    method: 'delete'
  })
}
