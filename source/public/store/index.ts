import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import workflows from './workflows'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { actions, workflows }
})
