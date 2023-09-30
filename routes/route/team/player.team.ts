import { Router, RouterOptions } from 'express'
import { playersByTeam } from 'controllers/team/player.team'

const router: Router = Router({ mergeParams: true } as RouterOptions)

router.get('/players', playersByTeam)

export default router
