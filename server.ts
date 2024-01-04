import * as dotenv from 'dotenv'
import * as cors from 'cors'
import { type CorsOptions } from 'cors'
import * as express from 'express'
import { type Express } from 'express'
import { createServer, type Server } from 'http'
import helmet from 'helmet'
import matchMiddleware from './middlewares/invalid.middleware'
import initializeStorage from 'services/storage/initialize.storage'
import initializeMail from 'services/mail/initialize.mail'
import routerV1 from 'routes/v1/router'

dotenv.config()

const server: Express = express()
const http: Server = createServer(server)
const port: number = Number(process.env.PORT as string)
const options: CorsOptions = {
	origin: JSON.parse(process.env.ADDRESSES as string)
}

server.set('trust proxy', true).options('*', cors())

server.use(cors(options)).use(helmet())

server
	.use(
		express.json({
			limit: '1kb',
			type: ['application/json', 'text/plain']
		})
	)
	.use(
		express.urlencoded({
			limit: '1kb',
			parameterLimit: 10,
			extended: true
		})
	)

server.use('/v1', routerV1).all('*', matchMiddleware)

initializeStorage()
initializeMail()

http.listen(port, (): void =>
	console.log(
		`${new Date().toLocaleTimeString('pl-PL')} [server] listening on http://localhost:${port}`
	)
)
