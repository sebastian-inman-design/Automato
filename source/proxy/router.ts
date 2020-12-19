import path from 'path'
import express from 'express'

import * as actions from '../main/actions'
import * as paths from '../paths'

const router: express.Router = express.Router()
router.use(express.json())


router.get('/actions', (req: express.Request, res: express.Response) => {

  let output: any = {}

  Object.entries(actions).map(([a, b]) => {
    output[a] = {}
    Object.entries(b).map(([c, d]) => {
      if (d.options.public) {
        output[a][c] = d.options
      }
    })
  })

  res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  res.json(output)

})

export { router }
