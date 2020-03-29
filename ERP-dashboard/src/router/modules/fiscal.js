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
    },
    {
      path: 'cstOrigems',
      component: () => import('@/views/cstOrigems/index'),
      name: 'cstOrigems',
      meta: { title: 'Cst Origem' }
    },
    {
      path: 'cstOrigem',
      component: () => import('@/views/cstOrigems/editor'),
      name: 'NewCstOrigem',
      meta: { title: 'Novo Cst Origem' },
      hidden: true
    },
    {
      path: 'cstOrigem/:id',
      component: () => import('@/views/cstOrigems/editor'),
      name: 'EditCstOrigem',
      meta: { title: 'Editar Cst Origem' },
      hidden: true
    },
    {
      path: 'cstTributacaos',
      component: () => import('@/views/cstTributacaos/index'),
      name: 'cstTributacaos',
      meta: { title: 'Cst Tributacao' }
    },
    {
      path: 'cstTributacao',
      component: () => import('@/views/cstTributacaos/editor'),
      name: 'NewCstTributacao',
      meta: { title: 'Novo Cst Tributacao' },
      hidden: true
    },
    {
      path: 'cstTributacao/:id',
      component: () => import('@/views/cstTributacaos/editor'),
      name: 'EditCstTributacao',
      meta: { title: 'Editar Cst Tributacao' },
      hidden: true
    },
    {
      path: 'historicos',
      component: () => import('@/views/historicos/index'),
      name: 'historicos',
      meta: { title: 'Historico' }
    },
    {
      path: 'historico',
      component: () => import('@/views/historicos/editor'),
      name: 'NewHistorico',
      meta: { title: 'Novo Historico' },
      hidden: true
    },
    {
      path: 'historico/:id',
      component: () => import('@/views/historicos/editor'),
      name: 'EditHistorico',
      meta: { title: 'Editar Historico' },
      hidden: true
    },
    {
      path: 'aliquotas',
      component: () => import('@/views/aliquotas/index'),
      name: 'aliquotas',
      meta: { title: 'Aliquota' }
    },
    {
      path: 'aliquota',
      component: () => import('@/views/aliquotas/editor'),
      name: 'NewAliquota',
      meta: { title: 'Novo Aliquota' },
      hidden: true
    },
    {
      path: 'aliquota/:id',
      component: () => import('@/views/aliquotas/editor'),
      name: 'EditAliquota',
      meta: { title: 'Editar Aliquota' },
      hidden: true
    }
  ]
}
