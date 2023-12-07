import { Router } from 'express'
import { teams, teamsById, teamsByName } from 'controllers/api/team.controller'
import { playersByTeamId } from 'controllers/api/player.controller'
import { staffByTeamId } from 'controllers/api/staff.controller'
import {
	playersStatisticsAvgByTeamId,
	playersStatisticsByTeamId
} from 'controllers/api/playerStatistics.controller'
import {
	teamStatisticsAvgByTeamId,
	teamStatisticsByTeamId
} from 'controllers/api/teamStatistics.controller'

const router: Router = Router()

router.get('/', teams)

router.get('/id/:id([0-9]{18})', teamsById)
router.get('/id/:id([0-9]{18})/statistics', teamStatisticsByTeamId)
router.get('/id/:id([0-9]{18})/statistics/avg', teamStatisticsAvgByTeamId)
router.get('/id/:id([0-9]{18})/players', playersByTeamId)
router.get('/id/:id([0-9]{18})/players/statistics', playersStatisticsByTeamId)
router.get('/id/:id([0-9]{18})/players/statistics/avg', playersStatisticsAvgByTeamId)
router.get('/id/:id([0-9]{18})/staff', staffByTeamId)

router.get('/name/:name', teamsByName)

export default router
