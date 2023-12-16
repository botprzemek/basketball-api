import { Router } from 'express'
import {
	getMatches,
	getMatchesAfter,
	getMatchesAfterDate,
	getMatchesBefore,
	getMatchesBeforeDate,
	getMatchesByDate,
	getMatchesById,
	getMatchesClosest
} from 'controllers/get/basketball/match.controller'
import { getTeamStatisticsByMatchId } from 'controllers/get/basketball/teamStatistics.controller'
import { getRostersByMatchId } from 'controllers/get/basketball/roster.controller'

const router: Router = Router()

router.get('/', getMatches)

router.get('/after', getMatchesAfter)
router.get('/before', getMatchesBefore)
router.get('/closest', getMatchesClosest)

router.get('/id/:id([0-9]{18})', getMatchesById)
router.get('/id/:id([0-9]{18})/rosters', getRostersByMatchId)
router.get('/id/:id([0-9]{18})/statistics', getTeamStatisticsByMatchId)

router.get('/date/:date(202[0-9]-[0,1][0-9]-[0,1,2,3][0-9])', getMatchesByDate)
router.get('/date/:date(202[0-9]-[0,1][0-9]-[0,1,2,3][0-9])/after', getMatchesAfterDate)
router.get('/date/:date(202[0-9]-[0,1][0-9]-[0,1,2,3][0-9])/before', getMatchesBeforeDate)

export default router
