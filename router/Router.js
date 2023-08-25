import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import validate from './Validate.js'
import players from './route/players/Players.js'
import web from './route/web/Web.js'
import error from './route/error/Error.js'

dotenv.config()

const router = express.Router()
const addresses = JSON.parse(process.env.ADDRESSES)
const options = { origin: addresses }

router.use(cors(options))
router.options('*', cors(options))

router.use((req, res, next) => validate(req, res, next))
router.use('/players', players)
router.use('/web', web)
router.use('*', error)

export default router