import electron from 'electron'

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

      }).then(resolve)

    })

  }


  static async Open() {

    Application.window = new electron.BrowserWindow(Application.options)

    Application.window.maximize()
    Application.window.removeMenu()

    if(process.env.NODE_ENV === 'development') {

      await Application.window.loadURL('http://localhost:8080')
      
    }else{
  
      await Application.window.loadURL('http://localhost:6427')
  
    }
    
    Application.window.webContents.openDevTools()

  }


  static Quit() {

    Application.instance.quit()

  }


}
