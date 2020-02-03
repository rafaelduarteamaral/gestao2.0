import Layout from '@/views/layout/Layout'

export default {
  path: '/orders',
  component: Layout,
  redirect: '/orders/all',
  name: 'Orders',
  meta: {
    title: 'Pedidos',
    icon: 'shopping'
  },
  children: [
    {
      path: 'vendas',
      component: () => import('@/views/orders/vendas/index'),
      name: 'AllOrders',
      meta: { title: 'Vendas', icon: '' }
    },
    {
      path: 'compras',
      component: () => import('@/views/orders/compras/index'),
      name: 'TodasCompras',
      meta: { title: 'Compras', icon: '' }
    },
    {
      path: 'novaVenda',
      component: () => import('@/views/orders/vendas/editor'),
      name: 'novaVenda',
      hidden: true,
      meta: { title: 'Novo Pedido' }
    },
    {
      path: 'novaCompra',
      component: () => import('@/views/orders/compras/editor'),
      name: 'novaCompra',
      hidden: true,
      meta: { title: 'Novo Pedido' }
    },
    {
      path: 'vendas/:id',
      component: () => import('@/views/orders/vendas/editor'),
      name: 'EditarVenda',
      hidden: true,
      meta: { title: 'Editar Pedido' }
    },
    {
      path: 'compra/:id',
      component: () => import('@/views/orders/compras/editor'),
      name: 'EditarCompra',
      hidden: true,
      meta: { title: 'Novo Pedido', icon: '' }
    }
  ]
}
