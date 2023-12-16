import { Router } from 'express'
import {
	getPlayers,
	getPlayersById,
	getPlayersByName
} from 'controllers/get/basketball/player.controller'
import { createPlayers } from 'controllers/post/basketball/player.controller'
import {
	getPlayersStatistics,
	getPlayersStatisticsAvg,
	getPlayersStatisticsAvgAssists,
	getPlayersStatisticsAvgByPlayerId,
	getPlayersStatisticsAvgPoints,
	getPlayersStatisticsAvgRebounds,
	getPlayersStatisticsByPlayerId
} from 'controllers/get/basketball/playerStatistics.controller'

const router: Router = Router()

router.get('/', getPlayers)

router.post('/', createPlayers)

router.get('/id/:id([0-9]{18})', getPlayersById)
router.get('/id/:id([0-9]{18})/statistics', getPlayersStatisticsByPlayerId)
router.get('/id/:id([0-9]{18})/statistics/avg', getPlayersStatisticsAvgByPlayerId)

router.get('/name/:name', getPlayersByName)

router.get('/statistics', getPlayersStatistics)
router.get('/statistics/avg', getPlayersStatisticsAvg)
router.get('/statistics/avg/points', getPlayersStatisticsAvgPoints)
router.get('/statistics/avg/rebounds', getPlayersStatisticsAvgRebounds)
router.get('/statistics/avg/assists', getPlayersStatisticsAvgAssists)

export default router
