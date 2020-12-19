import prefetch from '../middleware/prefetch'

export default {
  component: () => import('../pages/WorkflowEditor.vue'),
  name: 'workflows',
  path: '/workflows',
  children: [
    {
      component: () => import('../pages/WorkflowEditor.vue'),
      beforeEnter: prefetch,
      name: 'workflow.create',
      path: '/workflows/create'
    },
    {
      component: () => import('../pages/WorkflowEditor.vue'),
      name: 'workflow',
      path: '/workflows/:id'
    },
    {
      component: () => import('../pages/WorkflowEditor.vue'),
      beforeEnter: prefetch,
      name: 'workflow.edit',
      path: '/workflows/:id/edit'
    }
  ]
}
