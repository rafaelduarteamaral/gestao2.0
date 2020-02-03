import request from '@/utils/request'

export function all(query) {
  return request({
    url: 'admin/endereco',
    method: 'get',
    params: query
  })
}

export function find(id) {
  return request({
    url: `admin/endereco/${parseInt(id)}`,
    method: 'get'
  })
}

export function findEnderecoUser(id) {
  return request({
    url: `admin/UserEndereco/${parseInt(id)}`,
    method: 'get'
  })
}

export function save(endereco) {
  const method = endereco.id_endereco ? 'put' : 'post'
  return request({
    url: `admin/endereco${endereco.id_endereco ? '/' + parseInt(endereco.id_endereco) : ''}`,
    method,
    data: endereco
  })
}

export function destroy(id) {
  return request({
    url: `admin/endereco/${parseInt(id)}`,
    method: 'delete'
  })
}
