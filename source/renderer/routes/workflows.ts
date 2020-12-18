import * as Request from '../middleware/request'

export default {
  component: () => import('../pages/WorkflowEditor.vue'),
  name: 'Create New Workflow',
  path: '/workflows',
  children: [
    {
      component: () => import('../pages/WorkflowEditor.vue'),
      beforeEnter: Request.Actions,
      name: 'Create New Workflow',
      path: '/workflows/create'
    },
    {
      component: () => import('../pages/WorkflowEditor.vue'),
      name: 'Workflow',
      path: '/workflows/:id'
    },
    {
      component: () => import('../pages/WorkflowEditor.vue'),
      beforeEnter: Request.Actions,
      name: 'Edit Workflow',
      path: '/workflows/:id/edit'
    }
  ]
}
