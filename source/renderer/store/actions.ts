import axios from 'axios'
import { port } from '../../config'

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

    console.log(`${window.location.origin}proxy/actions?ts=${Date.now()}`)
    let { data } = await axios.get(`http://localhost:${port}/proxy/actions?ts=${Date.now()}`)
    commit('fetch', data)

  },
  

}

export default { namespaced: true, state, mutations, actions }
