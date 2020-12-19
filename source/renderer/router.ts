import Vue from 'vue'
import VueRouter from 'vue-router'

import index from './routes/index'
import workflows from './routes/workflows'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    index,
    workflows
  ]
})
