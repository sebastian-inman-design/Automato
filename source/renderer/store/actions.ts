const state = {

}

const mutations = {

  fetched(state: any, actions: any) {
    Object.assign(state, actions)
  }

}

const actions = {


  /**
   * Fetches all available workflows
   * and stores them globally.
   */

  async fetched({ commit }: any, actions: any) {

    console.log('fetching actions')
    commit('fetched', actions)

  },
  

}

export default { namespaced: true, state, mutations, actions }
