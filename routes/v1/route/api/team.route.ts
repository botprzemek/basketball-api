import { Router } from 'express'
import { getTeams, getTeamsById, getTeamsByName } from 'controllers/get/api/team.controller'
import {
	getTeamStatisticsAvgByTeamId,
	getTeamStatisticsByTeamId
} from 'controllers/get/api/teamStatistics.controller'
import { getPlayersByTeamId } from 'controllers/get/api/player.controller'
import {
	getPlayersStatisticsAvgByTeamId,
	getPlayersStatisticsByTeamId
} from 'controllers/get/api/playerStatistics.controller'
import { getStaffByTeamId } from 'controllers/get/api/staff.controller'

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
