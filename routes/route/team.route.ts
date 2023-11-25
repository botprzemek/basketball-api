import { Router } from 'express'
import { teams, teamsById, teamsByName } from 'controllers/api/team.controller'
import { playersByTeamId } from 'controllers/api/player.controller'
import { staffByTeamId } from 'controllers/api/staff.controller'
import { playersStatisticsByTeamId } from 'controllers/api/playerStatistics.controller'
import { teamStatisticsAvgByTeamId, teamStatisticsByTeamId } from 'controllers/api/teamStatistics.controller'

const router: Router = Router()

router.get('/', teams)

router.get('/id/:id', teamsById)
router.get('/id/:id/statistics', teamStatisticsByTeamId)
router.get('/id/:id/statistics/avg', teamStatisticsAvgByTeamId)
router.get('/id/:id/players', playersByTeamId)
router.get('/id/:id/players/statistics', playersStatisticsByTeamId)
router.get('/id/:id/staff', staffByTeamId)

router.get('/name/:name', teamsByName)

export default router
