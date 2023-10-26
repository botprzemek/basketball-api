import { Router } from 'express'
import { players, playersByName } from 'controllers/api/player.controller'

const router: Router = Router()

router.get('/', players)
router.get('/:name', playersByName)

export default router
