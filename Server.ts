import * as express from 'express'
import {Express} from 'express'
import helmet from 'helmet'
import router from 'router/Router'
import setupStorage from 'storage/Initialize'
import {setupMail} from 'mail/Initialize'

const server: Express = express()
const port: Number = parseInt(process.env.PORT)

server.disable('x-powered-by')
server.set('trust proxy', 1)

server.use(express.json({ limit: '1kb' }))
server.use(express.urlencoded({ limit: '1kb', extended: false }))
server.use(helmet())
server.use(router)

server.listen(port, () => {
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [server] listening on http://localhost:${port}`)
    setupStorage()
    setupMail()
})