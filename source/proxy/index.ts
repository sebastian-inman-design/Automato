import cors from 'cors'
import http from 'http'
import express from 'express'
import * as routes from './routes'

const port = 6427

const app = express()
const server = http.createServer(app)

app.use(cors())
app.use('/proxy', routes.proxy.default)
app.use(routes.renderer.default)

export { server, port }
