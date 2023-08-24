import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import players from './route/Players.js'
import error from './route/Error.js'

dotenv.config()

const router = express.Router()
const addresses = JSON.parse(process.env.ADDRESSES)
const options = { origin: addresses }

router.use(cors(options))
router.options('*', cors(options))

router.use((req, res, next) => {
    const authHeader = req.headers['authorization']

    if (!authHeader) return res.sendStatus(401)

    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.sendStatus(401)

    console.log(token)

    jwt.verify(token, process.env.TOKEN, err => {
        if (err) return res.sendStatus(401)
    })

    if (
        // req.headers['secret'] !== process.env.SECRET ||
        req.headers['content-type'] !== 'application/json'
    ) return res.sendStatus(401)

    res.locals.start = performance.now()
    next()
})

router.use('/players', players)
router.use('*', error)

export default router