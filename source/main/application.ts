import electron from 'electron'

export class Application {

  /** Electron default options. */
  static options: electron.BrowserWindowConstructorOptions = {
    webPreferences: {
      webviewTag: true,
      webSecurity: true,
      nodeIntegration: true,
      nativeWindowOpen: true
    }
  }

  /** Reference to the main application. */
  static instance: electron.App = electron.app

  /** Reference to the application window. */
  static window: electron.BrowserWindow

}
