import { Router } from 'express'
import { players, playersById, playersByName } from 'controllers/api/player.controller'
import {
  playersStatistics,
  playersStatisticsAvg,
  playersStatisticsAvgAssists,
  playersStatisticsAvgById,
  playersStatisticsAvgPoints,
  playersStatisticsAvgRebounds,
} from 'controllers/api/playerStatistics.controller'

const router: Router = Router()

router.get('/', players)

router.get('/id/:id', playersById)
router.get('/id/:id/statistics/avg', playersStatisticsAvgById)

router.get('/name/:name', playersByName)

router.get('/statistics', playersStatistics)
router.get('/statistics/avg', playersStatisticsAvg)
router.get('/statistics/avg/points', playersStatisticsAvgPoints)
router.get('/statistics/avg/rebounds', playersStatisticsAvgRebounds)
router.get('/statistics/avg/assists', playersStatisticsAvgAssists)

export default router
