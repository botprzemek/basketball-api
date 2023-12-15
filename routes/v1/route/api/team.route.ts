import { Router } from 'express'
import { getTeams, getTeamsById, getTeamsByName } from 'controllers/get/basketball/team.controller'
import {
	getTeamStatisticsAvgByTeamId,
	getTeamStatisticsByTeamId
} from 'controllers/get/basketball/teamStatistics.controller'
import { getPlayersByTeamId } from 'controllers/get/basketball/player.controller'
import {
	getPlayersStatisticsAvgByTeamId,
	getPlayersStatisticsByTeamId
} from 'controllers/get/basketball/playerStatistics.controller'
import { getStaffByTeamId } from 'controllers/get/basketball/staff.controller'

const router: Router = Router()

router.get('/', getTeams)

router.get('/id/:id([0-9]{18})', getTeamsById)
router.get('/id/:id([0-9]{18})/statistics', getTeamStatisticsByTeamId)
router.get('/id/:id([0-9]{18})/statistics/avg', getTeamStatisticsAvgByTeamId)
router.get('/id/:id([0-9]{18})/players', getPlayersByTeamId)
router.get('/id/:id([0-9]{18})/players/statistics', getPlayersStatisticsByTeamId)
router.get('/id/:id([0-9]{18})/players/statistics/avg', getPlayersStatisticsAvgByTeamId)
router.get('/id/:id([0-9]{18})/staff', getStaffByTeamId)

router.get('/name/:name', getTeamsByName)

export default router
