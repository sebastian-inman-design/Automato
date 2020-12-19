import path from 'path'
import express from 'express'

import * as paths from '../../paths'

let renderer: express.Router = express.Router()

renderer.use(express.static(path.join(paths.build, './renderer')))
renderer.use((req: express.Request, res: express.Response) => {
  res.sendFile(path.join(paths.build, './renderer/index.html'))
})

export default renderer
