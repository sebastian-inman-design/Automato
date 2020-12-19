import { server, port } from './proxy'
import { Application } from './main/application'

/** Start the proxy server. */
server.listen(port, () => {

  /** Launch the app. */
  Application.Launch()

  /** Quit the application when all windows are closed. */
  Application.instance.on('window-all-closed', () => {

    server.close()
    Application.Quit()

  })

})
