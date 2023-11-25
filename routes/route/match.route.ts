import { Router } from 'express'
import {
	matches,
	matchesAfterDate,
	matchesBeforeDate,
	matchesByClosest,
	matchesByDate,
	matchesById
} from 'controllers/api/match.controller'
import { rostersByMatchId } from 'controllers/api/roster.controller'
import { teamStatisticsByMatchId } from 'controllers/api/teamStatistics.controller'

const router: Router = Router()

router.get('/', matches)

router.get('/closest', matchesByClosest)

router.get('/id/:id', matchesById)
router.get('/id/:id/rosters', rostersByMatchId)
router.get('/id/:id/statistics', teamStatisticsByMatchId)

router.get('/date/:date(202[0-9]-[0,1][0-9]-[0,1,2,3][0-9])', matchesByDate)
router.get('/date/:date(202[0-9]-[0,1][0-9]-[0,1,2,3][0-9])/after', matchesAfterDate)
router.get('/date/:date(202[0-9]-[0,1][0-9]-[0,1,2,3][0-9])/before', matchesBeforeDate)

export default router
