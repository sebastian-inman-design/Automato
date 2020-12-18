import { Application } from './application'
import * as Actions from './actions'

export function emitActions() {

  let list: any = {}

  Object.entries(Actions).map(([collection, actions]) => {
    list[collection] = {}
    Object.entries(actions).map(([name, action]) => {
      if (action.options.public) {
        list[collection][name] = action.options
      }
    })
  })

  Application.window.webContents.send('emit-actions', { actions: list })

}
