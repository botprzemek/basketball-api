import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import players from './route/Players.js'

dotenv.config();

const router = express.Router();
const addresses = JSON.parse(process.env.ADDRESSES)
const options = { origin: addresses }

router.use(cors(options))
router.options('*', cors(options))

router.use((req, res, next) => {
    // if ((!req.headers['secret']) || req.headers['secret'] !== process.env.SECRET) return res.sendStatus(401)
    next()
})

router.use(players)

export default router