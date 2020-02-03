import request from '@/utils/request'

export function all(query) {
  return request({
    url: 'admin/users',
    method: 'get',
    params: query
  })
}

export function find(id) {
  return request({
    url: `admin/users/${parseInt(id)}`,
    method: 'get'
  })
}

export function save(user) {
  const method = user.id ? 'put' : 'post'
  return request({
    url: `admin/users${user.id ? '/' + parseInt(user.id) : ''}`,
    method,
    data: user
  })
}

export function destroy(id) {
  return request({
    url: `admin/users/${parseInt(id)}`,
    method: 'delete'
  })
}
