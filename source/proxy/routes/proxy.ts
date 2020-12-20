import express from 'express'
import bodyParser from 'body-parser'

import * as Actions from '../../main/actions'

import { Workflow } from '../../main/workflow'

let proxy: express.Router = express.Router()

proxy.use(express.json())
proxy.use(bodyParser.json({ limit: '50mb' }))

proxy.get('/actions', (req: express.Request, res: express.Response) => {

  let results: any = {}

  Object.entries(Actions).map(([a, b]) => {
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

proxy.post('/workflow/execute', async (req: express.Request, res: express.Response) => {

  let id: string = req.body.id
  let data: any = req.body.workflow

  let workflow = new Workflow(`${id}.json`, data)

  await Actions.Browser.Launch({ browser: data.browser || 'chrome' })
  await workflow.Execute()

  res.sendStatus(200)

})

export default proxy
