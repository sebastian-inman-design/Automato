import { ipcMain } from 'electron'
import { Application } from './main/application'
import { emitActions } from './main/emitter'

Application.Launch().then(() => {
  
  /** Listen for requests for available actions. */
  ipcMain.on('request-actions', () => emitActions())

})
