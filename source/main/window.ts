import electron from 'electron'

import path from 'path'
import * as paths from '../paths'
import { Application } from './application'

export class Window {

  static async Open() {

    Application.window = new electron.BrowserWindow(Application.options)

    Application.window.maximize()
    Application.window.removeMenu()

    await Application.window.loadFile(path.join(paths.build, './renderer/index.html'))
    Application.window.focus()

    if(process.env.NODE_ENV === 'development') {
      Application.window.webContents.openDevTools()
    }

  }

  static async Close() {

    Application.window.close()

  }

}
