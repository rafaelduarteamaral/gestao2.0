import request from '@/utils/request'

export function all(query) {
  return request({
    url: 'admin/bancos',
    method: 'get',
    params: query
  })
}

export function find(id) {
  return request({
    url: `admin/bancos/${parseInt(id)}`,
    method: 'get'
  })
}

export function save(banco) {
  console.log(banco)
  const method = banco.id ? 'put' : 'post'
  return request({
    url: `admin/bancos${banco.id ? '/' + parseInt(banco.id) : ''}`,
    method,
    data: banco
  })
}

export function destroy(id) {
  return request({
    url: `admin/bancos/${parseInt(id)}`,
    method: 'delete'
  })
}
