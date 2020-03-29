import request from '@/utils/request'

export function all(query) {
  return request({
    url: 'admin/historicos',
    method: 'get',
    params: query
  })
}

export function find(id) {
  return request({
    url: `admin/historicos/${parseInt(id)}`,
    method: 'get'
  })
}

export function save(historico) {
  const method = historico.id ? 'put' : 'post'
  return request({
    url: `admin/historicos${historico.id ? '/' + parseInt(historico.id) : ''}`,
    method,
    data: historico
  })
}

export function destroy(id) {
  return request({
    url: `admin/historicos/${parseInt(id)}`,
    method: 'delete'
  })
}
