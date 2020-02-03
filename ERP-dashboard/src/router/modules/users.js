import Layout from '@/views/layout/Layout'

export default {
  path: '/users',
  component: Layout,
  redirect: '/users/all',
  name: 'Users',
  meta: { title: 'Usuários', icon: 'peoples' },
  children: [
    {
      path: 'all',
      component: () => import('@/views/users/index'),
      name: 'AllUsers',
      meta: { title: 'Todos os Usuários' },
      hidden: true
    },
    {
      path: 'new',
      component: () => import('@/views/users/editor'),
      name: 'NewUser',
      meta: { title: 'Novo Usuário' },
      hidden: true
    },
    {
      path: ':id',
      component: () => import('@/views/users/editor'),
      name: 'EditUser',
      meta: { title: 'Editar Usuário' },
      hidden: true
    }
  ]
}
