import express from 'express'

const router = express.Router()

router.all('*', (req , res) => res.sendStatus(404))

export default router