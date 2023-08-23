import express from 'express'

const router = express.Router()

router.get('*', (req , res) => res.sendStatus(404))

export default router