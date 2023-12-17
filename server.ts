import * as dotenv from 'dotenv'
import * as express from 'express'
import { type Express } from 'express'
import * as cors from 'cors'
import { type CorsOptions } from 'cors'
import helmet, { type HelmetOptions } from 'helmet'
import { createServer, type Server } from 'http'
import routerV1 from 'routes/v1/router'
import matchMiddleware from './middlewares/invalid.middleware'
import initializeStorage from 'services/storage/initialize.storage'
import initializeMail from 'services/mail/initialize.mail'

dotenv.config()

const server: Express = express()
const http: Server = createServer(server)
const port: number = parseInt(process.env.PORT as string)

const options: CorsOptions = {
	origin: JSON.parse(process.env.ADDRESSES as string)
}

const helmetOptions: HelmetOptions = {
	contentSecurityPolicy: true
}

server.disable('x-powered-by').set('trust proxy', true).options('*', cors())

server
	.use(cors(options))
	.use(helmet(helmetOptions))
	.use(helmet.hidePoweredBy())
	.use(helmet.noSniff())

server
	.use(express.json({ limit: '100kb', type: ['application/json', 'text/plain'] }))
	.use(express.urlencoded({ limit: '100kb', parameterLimit: 10, extended: false }))

server.use('/v1', routerV1).get('*', matchMiddleware)

initializeStorage()
initializeMail()

http.listen(port, (): void =>
	console.log(
		`${new Date().toLocaleTimeString('pl-PL')} [server] listening on http://localhost:${port}`
	)
)
