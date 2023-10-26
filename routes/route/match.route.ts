import { Router } from 'express'
import { matches, matchesByDate } from 'controllers/api/match.controller'

const router: Router = Router()

router.get('/', matches)
router.get('^/:date(202[0-9]-[0,1][0-9]-[0,1,2,3][0-9])', matchesByDate)

export default router
