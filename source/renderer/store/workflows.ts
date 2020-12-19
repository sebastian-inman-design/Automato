const state = {

  updatingFeed: true,

  running: null,
  feed: {}

}

const mutations = {

  async fetchedOne(state: any, { id, workflow }: any) {

    state.feed[id] = workflow

  },

  async fetchedAll(state: any, workflows: any) {
    
    state.feed = {}
    state.updatingFeed = true

    await Object.assign(state.feed, workflows).then

    state.updatingFeed = false

  }

}

const actions = {


  /**
   * Fetches all available workflows
   * and stores them globally.
   */

  async fetch({ commit }: any, id: null|string = null) {

    console.log('fetching workflows...')
    let workflows = JSON.parse(window.localStorage.getItem('workflows')) || {}
    console.log({ workflows })

    if(id) {

      commit('fetchedOne', workflows[id])

    }else{

      commit('fetchedAll', workflows)

    }

  },


  /**
   * Creates a new workflow then runs
   * the workflows/fetch action to update
   * the global list of workflows.
   */

  async create({ dispatch }: any, { id, workflow }: any) {

    let workflows = JSON.parse(window.localStorage.getItem('workflows')) || {}
    workflows[String(id || Date.now())] = workflow
    
    window.localStorage.setItem('workflows', JSON.stringify(workflows))

  },


  async update({ dispatch }: any, { id, workflow }: any) {

    let workflows = JSON.parse(window.localStorage.getItem('workflows')) || {}
    workflows[id] = workflow
    
    window.localStorage.setItem('workflows', JSON.stringify(workflows))

  },

  /**
   * Deletes an existing workflow the runs
   * the workflows/fetch action to update
   * the global list of workflows.
   */

  async delete({ dispatch }: any, id: string) {

    let workflows = JSON.parse(window.localStorage.getItem('workflows')) || {}
    delete workflows[id]
    
    window.localStorage.setItem('workflows', JSON.stringify(workflows))

  },


  async execute({ dispatch, commit }: any, { id, workflow }: any) {

    console.log('executing workflow')
    console.log({ id, workflow })

  }
  

}

export default { namespaced: true, state, mutations, actions }
