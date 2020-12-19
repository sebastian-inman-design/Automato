import axios from 'axios'

const state = {

}

const mutations = {

  fetch(state: any, actions: any) {
    Object.assign(state, actions)
  }

}

const actions = {


  /**
   * Fetches all available workflows
   * and stores them globally.
   */

  async fetch({ commit }: any) {

    let { data } = await axios.get(`http://localhost:6427/proxy/actions?ts=${Date.now()}`)
    commit('fetch', data)

  },
  

}

export default { namespaced: true, state, mutations, actions }
