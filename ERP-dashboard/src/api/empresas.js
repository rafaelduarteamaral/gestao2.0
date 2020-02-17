import request from '@/utils/request'

export function all(query) {
  return request({
    url: 'admin/empresas',
    method: 'get',
    params: query
  })
}

export function find(id) {
  return request({
    url: `admin/empresas/${parseInt(id)}`,
    method: 'get'
  })
}

export function save(empresa) {
  const method = empresa.id ? 'put' : 'post'
  return request({
    url: `admin/empresas${empresa.id ? '/' + parseInt(empresa.id) : ''}`,
    method,
    data: empresa
  })
}

export function destroy(id) {
  return request({
    url: `admin/empresas/${parseInt(id)}`,
    method: 'delete'
  })
}
