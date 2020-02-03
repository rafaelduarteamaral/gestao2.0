import request from '@/utils/request'

export function all(query) {
  return request({
    url: 'admin/categories',
    method: 'get',
    params: query
  })
}

export function find(id) {
  return request({
    url: `admin/categories/${parseInt(id)}`,
    method: 'get'
  })
}

export function save(category) {
  const method = category.id ? 'put' : 'post'
  return request({
    url: `admin/categories${category.id ? '/' + parseInt(category.id) : ''}`,
    method,
    data: category
  })
}

export function destroy(id) {
  return request({
    url: `admin/categories/${parseInt(id)}`,
    method: 'delete'
  })
}
