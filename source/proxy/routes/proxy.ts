import express from 'express'
import bodyParser from 'body-parser'
import * as actions from '../../main/actions'

let proxy: express.Router = express.Router()

proxy.use(express.json())
proxy.use(bodyParser.json({ limit: '50mb' }))

proxy.get('/actions', (req: express.Request, res: express.Response) => {

  let results: any = {}

  Object.entries(actions).map(([a, b]) => {
    results[a] = {}
    Object.entries(b).map(([c, d]) => {
      if (d.options.public) {
        results[a][c] = d.options
      }
    })
  })

  res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  res.json(results)

})

export default proxy
