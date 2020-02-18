import Layout from '@/views/layout/Layout'

export default {
  path: '/cadastro',
  component: Layout,
  redirect: '/cadastro/all',
  name: 'Cadastro',
  meta: {
    title: 'Cadastro',
    icon: 'queue_play_next'
  },
  children: [
    {
      path: 'todosProdutos',
      component: () => import('@/views/products/index'),
      name: 'todosProducts',
      meta: { title: 'Produtos' }
    },
    {
      path: 'categories',
      component: () => import('@/views/products/categories'),
      name: 'Categories',
      meta: { title: 'Categorias', icon: '' }
    },
    {
      path: 'novoProduto',
      component: () => import('@/views/products/editor'),
      name: 'NewProduct',
      hidden: true,
      meta: { title: 'Novo Produto' }
    },
    {
      path: 'produto/:id',
      component: () => import('@/views/products/editor'),
      name: 'EditProduct',
      hidden: true,
      meta: { title: 'Editar Produto' }
    },
    {
      path: 'usuarios',
      component: () => import('@/views/users/index'),
      name: 'todosUsuarios',
      meta: { title: 'Usuários' }
    },
    {
      path: 'novoUsuario',
      component: () => import('@/views/users/editor'),
      name: 'NewUser',
      meta: { title: 'Novo Usuário' },
      hidden: true
    },
    {
      path: 'usuario/:id',
      component: () => import('@/views/users/editor'),
      name: 'EditUser',
      meta: { title: 'Editar Usuário' },
      hidden: true
    },
    {
      path: 'empresas',
      component: () => import('@/views/empresa/index'),
      name: 'Empresas',
      meta: { title: 'Empresas' }
    },
    {
      path: 'empresa/:id',
      component: () => import('@/views/empresa/editor'),
      name: 'EditEmpresa',
      meta: { title: 'Editar Empresa' },
      hidden: true
    },
    {
      path: 'novaEmpresa',
      component: () => import('@/views/empresa/editor'),
      name: 'NewEmpresa',
      meta: { title: 'Nova Empresa' },
      hidden: true
    },
    {
      path: 'formasPagamentos',
      component: () => import('@/views/formaPagamento/index'),
      name: 'formasPagamentos',
      meta: { title: 'Formas Pgto' }
    },
    {
      path: 'formaPagamento',
      component: () => import('@/views/formaPagamento/editor'),
      name: 'NewFormaPagamento',
      meta: { title: 'Nova Forma de Pagamento' },
      hidden: true
    },
    {
      path: 'formapPagamento/:id',
      component: () => import('@/views/formaPagamento/editor'),
      name: 'EditFormaPagamento',
      meta: { title: 'Editar forma Pagamento' },
      hidden: true
    }
  ]
}
