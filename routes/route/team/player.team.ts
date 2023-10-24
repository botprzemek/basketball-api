import {Router, RouterOptions} from 'express'
import {playersByTeam} from 'controllers/api/playerTeam.controller'

const router: Router = Router({ mergeParams: true } as RouterOptions)

router.get('/', playersByTeam)

// router.get('/statistics', playersStatistics)

export default router
