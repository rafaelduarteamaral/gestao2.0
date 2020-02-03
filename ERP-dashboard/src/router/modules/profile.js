import Layout from '@/views/layout/Layout'

export default {
  path: 'profile',
  component: Layout,
  redirect: '/profile/me',
  name: 'Profile',
  meta: {
    title: 'Profile',
    icon: 'chart'
  },
  children: [
    {
      path: 'me',
      component: () => import('@/views/profile/index'),
      name: 'Profile',
      meta: { title: 'My Profile', icon: '' }
    }
  ]
}
