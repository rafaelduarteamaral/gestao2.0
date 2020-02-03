import request from '@/utils/request'

export function all(query) {
  return request({
    url: 'admin/orders',
    method: 'get',
    params: query
  })
}

export function find(id) {
  return request({
    url: `admin/orders/${parseInt(id)}`,
    method: 'get'
  })
}

export function financeiro(order) {
  return request({
    url: `admin/orders/financeiro`,
    method: 'post',
    data: order
  })
}

export function save(order) {
  const method = order.id ? 'put' : 'post'
  return request({
    url: `admin/orders${order.id ? '/' + parseInt(order.id) : ''}`,
    method,
    data: order
  })
}

export function destroy(id) {
  return request({
    url: `admin/orders/${parseInt(id)}`,
    method: 'delete'
  })
}

export function applyDiscount(id, code) {
  return request({
    url: `admin/orders/${id}/discount`,
    method: 'post',
    data: { code }
  })
}

export function removeDiscount(id, discount_id) {
  return request({
    url: `admin/orders/${id}/discount`,
    method: 'delete',
    data: { discount_id }
  })
}
