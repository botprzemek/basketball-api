import { Router, RouterOptions } from 'express'
import { playersByTeam } from 'controllers/team/player.team'

const router: Router = Router({ mergeParams: true } as RouterOptions)

router.get('/', playersByTeam)

// router.get('/statistics', playersStatistics)

export default router
