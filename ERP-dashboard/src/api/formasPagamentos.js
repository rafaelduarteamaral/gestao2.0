import request from '@/utils/request'

export function all(query) {
  return request({
    url: 'admin/formasPagamentos',
    method: 'get',
    params: query
  })
}

export function find(id) {
  return request({
    url: `admin/formasPagamentos/${parseInt(id)}`,
    method: 'get'
  })
}

export function save(formaPagamento) {
  const method = formaPagamento.id ? 'put' : 'post'
  return request({
    url: `admin/formasPagamentos${formaPagamento.id ? '/' + parseInt(formaPagamento.id) : ''}`,
    method,
    data: formaPagamento
  })
}

export function destroy(id) {
  return request({
    url: `admin/formasPagamentos/${parseInt(id)}`,
    method: 'delete'
  })
}
