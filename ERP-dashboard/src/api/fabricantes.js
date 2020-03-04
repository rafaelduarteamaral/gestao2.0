import request from '@/utils/request'

export function all(query) {
  return request({
    url: 'admin/fabricantes',
    method: 'get',
    params: query
  })
}

export function find(id) {
  return request({
    url: `admin/fabricantes/${parseInt(id)}`,
    method: 'get'
  })
}

export function save(seguimentoNegocio) {
  const method = seguimentoNegocio.id ? 'put' : 'post'
  return request({
    url: `admin/fabricantes${seguimentoNegocio.id ? '/' + parseInt(seguimentoNegocio.id) : ''}`,
    method,
    data: seguimentoNegocio
  })
}

export function destroy(id) {
  return request({
    url: `admin/fabricantes/${parseInt(id)}`,
    method: 'delete'
  })
}
