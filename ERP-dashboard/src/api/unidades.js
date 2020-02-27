import request from '@/utils/request'

export function all(query) {
  return request({
    url: 'admin/unidades',
    method: 'get',
    params: query
  })
}

export function find(id) {
  return request({
    url: `admin/unidades/${parseInt(id)}`,
    method: 'get'
  })
}

export function save(unidade) {
  console.log(unidade)
  const method = unidade.id ? 'put' : 'post'
  return request({
    url: `admin/unidades${unidade.id ? '/' + parseInt(unidade.id) : ''}`,
    method,
    data: unidade
  })
}

export function destroy(id) {
  return request({
    url: `admin/unidades/${parseInt(id)}`,
    method: 'delete'
  })
}
