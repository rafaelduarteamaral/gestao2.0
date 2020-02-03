import Layout from '@/views/layout/Layout'

export default {
  path: '/coupons',
  component: Layout,
  redirect: '/coupons/all',
  name: 'Coupons',
  meta: {
    title: 'Cupons',
    icon: 'coupon'
  },
  children: [
    {
      path: 'all',
      component: () => import('@/views/coupons/index'),
      name: 'AllCoupons',
      hidden: true,
      meta: { title: 'Todos os Cupons', icon: '' }
    }
  ]
}
