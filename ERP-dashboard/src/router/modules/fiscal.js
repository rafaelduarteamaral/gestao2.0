import Layout from '@/views/layout/Layout'

export default {
  path: '/fiscal',
  component: Layout,
  redirect: '/fiscal/all',
  name: 'Fiscal',
  meta: {
    title: 'Fiscal',
    icon: 'queue_play_next'
  },
  children: [
    {
      path: 'cfops',
      component: () => import('@/views/cfops/index'),
      name: 'cfops',
      meta: { title: 'Cfop' }
    },
    {
      path: 'cfop',
      component: () => import('@/views/cfops/editor'),
      name: 'NewCfop',
      meta: { title: 'Novo Cfop' },
      hidden: true
    },
    {
      path: 'cfop/:id',
      component: () => import('@/views/cfops/editor'),
      name: 'EditCfop',
      meta: { title: 'Editar Cfop' },
      hidden: true
    },
    {
      path: 'ncms',
      component: () => import('@/views/ncms/index'),
      name: 'ncms',
      meta: { title: 'Ncm' }
    },
    {
      path: 'ncm',
      component: () => import('@/views/ncms/editor'),
      name: 'NewNcm',
      meta: { title: 'Novo Ncm' },
      hidden: true
    },
    {
      path: 'ncm/:id',
      component: () => import('@/views/ncms/editor'),
      name: 'EditNcm',
      meta: { title: 'Editar Ncm' },
      hidden: true
    }
  ]
}
