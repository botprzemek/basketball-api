import {Router} from 'express'

const router = Router()

router.get('/', (req, res) => res.send({ test: "Test" }))

export default router