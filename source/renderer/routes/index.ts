import prefetch from '../middleware/prefetch'

export default {
  component: () => import('../pages/Index.vue'),
  beforeEnter: prefetch,
  name: 'index',
  path: '/'
}
