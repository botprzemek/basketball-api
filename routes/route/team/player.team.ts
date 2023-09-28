import { Router, type RouterOptions } from 'express'
import { playersByTeam } from 'controllers/team/player.team.controller'

const router: Router = Router({ mergeParams: true } as RouterOptions)

router.get('/players', playersByTeam)

export default router
