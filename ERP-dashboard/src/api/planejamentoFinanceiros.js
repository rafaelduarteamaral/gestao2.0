import request from '@/utils/request'

export function all(query) {
  return request({
    url: 'admin/planejamentoFinanceiro',
    method: 'get',
    params: query
  })
}

export function find(id) {
  return request({
    url: `admin/planejamentoFinanceiro/${parseInt(id)}`,
    method: 'get'
  })
}

export function save(planejamentoFinanceiro) {
  const method = planejamentoFinanceiro.id ? 'put' : 'post'
  return request({
    url: `admin/planejamentoFinanceiro${planejamentoFinanceiro.id ? '/' + parseInt(planejamentoFinanceiro.id) : ''}`,
    method,
    data: planejamentoFinanceiro
  })
}

export function destroy(id) {
  return request({
    url: `admin/planejamentoFinanceiro/${parseInt(id)}`,
    method: 'delete'
  })
}
