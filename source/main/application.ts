require('dotenv-flow').config()

import path from 'path'
import electron from 'electron'
import * as paths from '../paths'

console.log(process.env.NODE_ENV)

export class Application {

  static options: electron.BrowserWindowConstructorOptions = {
    webPreferences: {
      webSecurity: true,
      nodeIntegration: true,
      nativeWindowOpen: true
    }
  }

  static instance: electron.App = electron.app

  static window: electron.BrowserWindow


  static async Launch() {

    return new Promise((resolve) => {

      /** Open the main window when the app is ready. */
      Application.instance.whenReady().then( async () => {

        /** Open the app. */
        await Application.Open()

        /** Open the main window on activation. */
        Application.instance.on('activate', Application.Open)

        /** Quit the application when all windows are closed. */
        Application.instance.on('window-all-closed', Application.Quit)

      }).then(resolve)

    })

  }


  static async Open() {

    Application.window = new electron.BrowserWindow(Application.options)
    Application.window.maximize()

    if(process.env.NODE_ENV === 'development') {

      await Application.window.loadURL('http://localhost:8080')
      Application.window.webContents.openDevTools()
      
    }else{
  
      await Application.window.loadFile('renderer/index.html')
  
    }

  }


  static Quit() {

    Application.instance.quit()

  }


}
