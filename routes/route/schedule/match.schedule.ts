import { Router, RouterOptions } from 'express'
import { schedulesAfterDate, schedulesBeforeDate, schedulesByDate } from 'controllers/api/matchSchedule.controller'

const router: Router = Router({ mergeParams: true } as RouterOptions)

router.get('/', schedulesByDate)
router.get('/after', schedulesAfterDate)
router.get('/before', schedulesBeforeDate)

export default router
