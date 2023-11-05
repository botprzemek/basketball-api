import { Router, RouterOptions } from 'express'
import { playersByTeam } from 'controllers/api/player.controller'

const router: Router = Router({ mergeParams: true } as RouterOptions)

router.get('/', playersByTeam)

export default router
