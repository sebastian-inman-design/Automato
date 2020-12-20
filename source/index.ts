import { port } from './config'
import { server } from './proxy'

import { Window } from './main/window'
import { Application } from './main/application'


/** Launch the app. */
Application.instance.whenReady().then( async () => {

  /** Start the proxy server. */
  server.listen(port, () => {
    
    console.log(`Proxy server listening on port ${port}`)

    /** Open the app. */
    Window.Open() 

  })

  /** Open the main window on activation. */
  Application.instance.on('activate', Window.Open)

  /** Quit the application when all windows are closed. */
  Application.instance.on('window-all-closed', () => {

    server.close()
    Application.instance.quit()

  })

})
