import { Router } from 'express'
import { players } from 'controllers/Player.controller'

const router: Router = Router()

router.get('/', players)

export default router
