import request from '@/utils/request'

export function all(query) {
  return request({
    url: 'admin/condicaoPagamentos',
    method: 'get',
    params: query
  })
}

export function find(id) {
  return request({
    url: `admin/condicaoPagamentos/${parseInt(id)}`,
    method: 'get'
  })
}

export function save(condicaoPagamento) {
  const method = condicaoPagamento.id ? 'put' : 'post'
  return request({
    url: `admin/condicaoPagamentos${condicaoPagamento.id ? '/' + parseInt(condicaoPagamento.id) : ''}`,
    method,
    data: condicaoPagamento
  })
}

export function destroy(id) {
  return request({
    url: `admin/condicaoPagamentos/${parseInt(id)}`,
    method: 'delete'
  })
}
