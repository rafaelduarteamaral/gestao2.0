import Layout from '@/views/layout/Layout'

export default {
  path: '/products',
  component: Layout,
  redirect: '/products/all',
  name: 'Products',
  meta: {
    title: 'Produtos',
    icon: 'cart-item'
  },
  children: [
    {
      path: 'all',
      component: () => import('@/views/products/index'),
      name: 'AllProducts',
      meta: { title: 'Todos os Produtos' }
    },
    {
      path: 'categories',
      component: () => import('@/views/products/categories'),
      name: 'Categories',
      meta: { title: 'Categorias', icon: '' }
    },
    {
      path: 'new',
      component: () => import('@/views/products/editor'),
      name: 'NewProduct',
      hidden: true,
      meta: { title: 'Novo Produto' }
    },
    {
      path: ':id',
      component: () => import('@/views/products/editor'),
      name: 'EditProduct',
      hidden: true,
      meta: { title: 'Editar Produto' }
    }
  ]
}
