import Layout from '@/views/layout/Layout'

export default {
  path: '/relatorios',
  component: Layout,
  redirect: '/relatorios/all',
  name: 'Relatorios',
  meta: {
    title: 'Relatorios',
    icon: 'cart-item'
  },
  children: [
    {
      path: 'Financeiro',
      component: () => import('@/views/relatorios/financeiro'),
      name: 'Financeiro',
      meta: { title: 'Financeiro', icon: '' }
    }
  ]
}
