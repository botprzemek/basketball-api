import { Router } from 'express'
import { players, playersById, playersByName } from 'controllers/api/player.controller'
import { playersStatistics, playersStatisticsTopPoints } from 'controllers/api/playerStatistics.controller'

const router: Router = Router()

router.get('/', players)
router.get('/id/:id', playersById)
router.get('/name/:name', playersByName)

router.get('/statistics', playersStatistics)
router.get('/statistics/top/points', playersStatisticsTopPoints)

export default router
