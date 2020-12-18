import './hooks'
import Vue from 'vue'

import store from './store'
import router from './router'

import './assets/scss/global.scss'
import template from './components/Template.vue'

(async () => {

  const common = require.context('./components/common', true, /\w+(.vue|.js)$/)

  common.keys().forEach((filename: string) => {
    const config = common(filename)
    let parts = filename.split("/").filter(part => part !== ".")
    let name: any = parts.join("").replace(/\.\w+$/, "")
    Vue.component(name, config.default || config)
  })

  return new Vue({
    store,
    router,
    render: (component: any) => component(template),
  }).$mount('#app')

})()
