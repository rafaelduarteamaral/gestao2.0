import request from '@/utils/request'

export function all(query) {
  return request({
    url: 'admin/coupons',
    method: 'get',
    params: query
  })
}

export function find(id) {
  return request({
    url: `admin/coupons/${parseInt(id)}`,
    method: 'get'
  })
}

export function save(coupon) {
  const method = coupon.id ? 'put' : 'post'
  return request({
    url: `admin/coupons${coupon.id ? '/' + parseInt(coupon.id) : ''}`,
    method,
    data: coupon
  })
}

export function destroy(id) {
  return request({
    url: `admin/coupons/${parseInt(id)}`,
    method: 'delete'
  })
}
