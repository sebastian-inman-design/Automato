const state = {

}

const mutations = {

  fetchedAll(state: any, actions: any) {
    Object.assign(state, actions)
  }

}

const actions = {


  /**
   * Fetches all available workflows
   * and stores them globally.
   */

  async fetch({ commit }: any) {

    console.log('fetching actions')
    commit('fetchedAll', {})

  },
  

}

export default { namespaced: true, state, mutations, actions }
