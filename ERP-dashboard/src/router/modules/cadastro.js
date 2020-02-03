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
    }
  ]
}
