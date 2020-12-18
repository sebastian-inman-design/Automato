const { ipcRenderer } = window.require('electron')
import store from '../store'


export async function Actions(to: any, from: any, next: Function) {

  ipcRenderer.send('request-actions', {})
  ipcRenderer.once('emit-actions', ( event: any, { actions }: any) => {

    store.commit('actions/fetched', actions)
    next()

  })

}

export async function Workflows(to: any, from: any, next: Function) {

  ipcRenderer.send('request-workflows')
  ipcRenderer.once('emit-workflows', ( event: any, { workflows }: any) => {

    store.commit('workflows/fetched', workflows)
    next()

  })

}
