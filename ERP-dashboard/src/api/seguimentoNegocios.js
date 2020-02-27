import request from '@/utils/request'

export function all(query) {
  return request({
    url: 'admin/seguimentoNegocios',
    method: 'get',
    params: query
  })
}

export function find(id) {
  return request({
    url: `admin/seguimentoNegocios/${parseInt(id)}`,
    method: 'get'
  })
}

export function save(seguimentoNegocio) {
  const method = seguimentoNegocio.id ? 'put' : 'post'
  return request({
    url: `admin/seguimentoNegocios${seguimentoNegocio.id ? '/' + parseInt(seguimentoNegocio.id) : ''}`,
    method,
    data: seguimentoNegocio
  })
}

export function destroy(id) {
  return request({
    url: `admin/seguimentoNegocios/${parseInt(id)}`,
    method: 'delete'
  })
}
