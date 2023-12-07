import { Router } from 'express'
import {
	matches,
	matchesAfter,
	matchesAfterDate,
	matchesBefore,
	matchesBeforeDate,
	matchesByDate,
	matchesById,
	matchesClosest
} from 'controllers/api/match.controller'
import { teamStatisticsByMatchId } from 'controllers/api/teamStatistics.controller'
import { rostersByMatchId } from 'controllers/api/roster.controller'

const router: Router = Router()

router.get('/', matches)

router.get('/after', matchesAfter)
router.get('/before', matchesBefore)
router.get('/closest', matchesClosest)

router.get('/id/:id([0-9]{18})', matchesById)
router.get('/id/:id([0-9]{18})/rosters', rostersByMatchId)
router.get('/id/:id([0-9]{18})/statistics', teamStatisticsByMatchId)

router.get('/date/:date(202[0-9]-[0,1][0-9]-[0,1,2,3][0-9])', matchesByDate)
router.get('/date/:date(202[0-9]-[0,1][0-9]-[0,1,2,3][0-9])/after', matchesAfterDate)
router.get('/date/:date(202[0-9]-[0,1][0-9]-[0,1,2,3][0-9])/before', matchesBeforeDate)

export default router
