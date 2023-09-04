import * as express from 'express'
import {Express} from 'express'
import helmet from 'helmet'
import setupStorage from 'services/storage/Initialize'
import setupMail from 'services/mail/Mail'
import router from 'routes/Router'

const server: Express = express()
const port: Number = parseInt(process.env.PORT)

server.disable('x-powered-by')
server.set('trust proxy', 1)

server.use(express.json({ limit: '100kb', type: ['application/json', 'text/plain'] }))
server.use(express.urlencoded({ limit: '100kb', parameterLimit: 100, extended: false }))
server.use(helmet())
server.use(router)

server.listen(port, (): void => {
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [server] listening on http://localhost:${port}`)
    setupMail()
    setupStorage()
})