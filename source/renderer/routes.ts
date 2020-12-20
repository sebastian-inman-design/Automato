import prefetch from './middleware/prefetch'

import Index from './pages/Index.vue'
import WorkflowEditor from './pages/WorkflowEditor.vue'
import WorkflowRunner from './pages/WorkflowRunner.vue'

export default [

  {
    component: Index,
    beforeEnter: prefetch,
    name: 'index',
    path: '/'
  },

  {
    component: WorkflowEditor,
    beforeEnter: prefetch,
    name: 'workflow.create',
    path: '/workflows/create'
  },

  {
    component: WorkflowEditor,
    beforeEnter: prefetch,
    name: 'workflow.edit',
    path: '/workflows/:id/edit'
  },

  {
    component: WorkflowRunner,
    beforeEnter: prefetch,
    name: 'workflow.run',
    path: '/workflows/:id/run'
  }
  
]
