import request from '@/utils/request'

export function all(query) {
  return request({
    url: 'admin/tipoOperacaos',
    method: 'get',
    params: query
  })
}

export function find(id) {
  return request({
    url: `admin/tipoOperacaos/${parseInt(id)}`,
    method: 'get'
  })
}

export function save(tipoOperacao) {
  const method = tipoOperacao.id ? 'put' : 'post'
  return request({
    url: `admin/tipoOperacaos${tipoOperacao.id ? '/' + parseInt(tipoOperacao.id) : ''}`,
    method,
    data: tipoOperacao
  })
}

export function destroy(id) {
  return request({
    url: `admin/tipoOperacaos/${parseInt(id)}`,
    method: 'delete'
  })
}
