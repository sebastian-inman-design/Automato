import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import { router } from './router'

const port = 6427

const app = express()
const server = http.createServer(app)

app.use(bodyParser.json({ limit: '50mb' }))
app.use('/proxy', router)

export { server, port }
