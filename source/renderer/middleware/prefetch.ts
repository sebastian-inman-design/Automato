import store from '../store'


export default async function(to: any, from: any, next: Function) {

  if(!to.name || to.name === 'index') {
    await store.dispatch('workflows/fetch')
  }

  if(to.name === 'workflow.create') {
    await store.dispatch('actions/fetch')
  }

  if(to.name === 'workflow.edit') {
    await store.dispatch('actions/fetch')
    let workflows = JSON.parse(window.localStorage.getItem('workflows')) || {}
    to.meta.workflow = workflows[to.params.id]
  }

  next()

}
