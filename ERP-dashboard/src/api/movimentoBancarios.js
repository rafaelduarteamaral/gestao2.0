import request from '@/utils/request'

export function all(query) {
  return request({
    url: 'admin/movimentoBancario',
    method: 'get',
    params: query
  })
}

export function find(id) {
  return request({
    url: `admin/movimentoBancario/${parseInt(id)}`,
    method: 'get'
  })
}

export function save(movimentoBancario) {
  const method = movimentoBancario.id ? 'put' : 'post'
  return request({
    url: `admin/movimentoBancario${movimentoBancario.id ? '/' + parseInt(movimentoBancario.id) : ''}`,
    method,
    data: movimentoBancario
  })
}

export function destroy(id) {
  return request({
    url: `admin/movimentoBancario/${parseInt(id)}`,
    method: 'delete'
  })
}
