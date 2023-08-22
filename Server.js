import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import router from './routing/Router.js'

dotenv.config();

const server = express()
const port = process.env.PORT
const addresses = JSON.parse(process.env.ADDRESSES)

const options = { origin: addresses }

server.use(cors(options))
server.options('*', cors(options))
server.use(express.json({ limit: '1mb' }))
server.use(express.urlencoded({ extended: false }))

server.disable('x-powered-by')

server.use(router);

server.listen(port, () => {
    console.log(`[server] listening on http://localhost:${port}`)
})