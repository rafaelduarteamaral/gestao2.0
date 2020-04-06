import Layout from '@/views/layout/Layout'

export default {
  path: '/financeiro',
  component: Layout,
  redirect: '/financeiro/all',
  name: 'Financeiro',
  meta: {
    title: 'Financeiro',
    icon: 'local_atm'
  },
  children: [
    {
      path: 'tipoDocumentos',
      component: () => import('@/views/tipoDocumento/index'),
      name: 'tipoDocumentos',
      meta: { title: 'Tipo de Documentos' }
    },
    {
      path: 'tipoDocumento',
      component: () => import('@/views/tipoDocumento/editor'),
      name: 'NewTipoDocumento',
      meta: { title: 'Novo Tipo de Documento' },
      hidden: true
    },
    {
      path: 'tipoDocumento/:id',
      component: () => import('@/views/tipoDocumento/editor'),
      name: 'EditTipoDocumento',
      meta: { title: 'Editar Tipo de Documento' },
      hidden: true
    },
    {
      path: 'movimentoBancarios',
      component: () => import('@/views/movimentoBancarios/index'),
      name: 'movimentoBancarios',
      meta: { title: 'Movimento Bancário' }
    },
    {
      path: 'movimentoBancario',
      component: () => import('@/views/movimentoBancarios/editor'),
      name: 'NewMovimentoBancario',
      meta: { title: 'Novo Movimento Bancário' },
      hidden: true
    },
    {
      path: 'movimentoBancario/:id',
      component: () => import('@/views/movimentoBancarios/editor'),
      name: 'EditMovimentoBancario',
      meta: { title: 'Editar Movimento Bancário' },
      hidden: true
    }
  ]
}
