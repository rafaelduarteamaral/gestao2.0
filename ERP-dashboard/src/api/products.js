import request from '@/utils/request'

export function all(query) {
  return request({
    url: 'admin/products',
    method: 'get',
    params: query
  })
}

export function find(id) {
  return request({
    url: `admin/products/${parseInt(id)}`,
    method: 'get'
  })
}

export function save(product) {
  const method = product.id ? 'put' : 'post'
  return request({
    url: `admin/products${product.id ? '/' + parseInt(product.id) : ''}`,
    method,
    data: product
  })
}

export function destroy(id) {
  return request({
    url: `admin/products/${parseInt(id)}`,
    method: 'delete'
  })
}
