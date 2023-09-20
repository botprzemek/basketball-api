import * as express from 'express'
import { Express } from 'express'
import { createServer, Server } from 'http'
import helmet, { HelmetOptions } from 'helmet'
import setupStorage from 'services/storage/Initialize'
import setupMail from 'services/mail/Mail'
import router from 'routes/Router'
import setupSocket from 'services/socket/Socket'
import * as cors from 'cors'
import { CorsOptions } from 'cors'

const server: Express = express()
const http: Server = createServer(server)
const port: number = parseInt(process.env.PORT)

server.disable('x-powered-by')
server.set('trust proxy', 1)

server.options('*', cors())

server.use(cors({ origin: JSON.parse(process.env.ADDRESSES) } as CorsOptions))
server.use(express.json({ limit: '100kb', type: ['application/json', 'text/plain'] }))
server.use(express.urlencoded({ limit: '100kb', parameterLimit: 100, extended: false }))
server.use(helmet({ contentSecurityPolicy: false } as HelmetOptions))
server.use(helmet.hidePoweredBy())
server.use(helmet.noSniff())
server.use(router)

server.use(express.static(__dirname + '/public'))

http.listen(port, (): void => {
  console.log(`${new Date().toLocaleTimeString('pl-PL')} [server] listening on http://localhost:${port}`)
  setupMail()
  setupStorage()
  setupSocket(http)
})
