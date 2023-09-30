import { Router, RouterOptions } from 'express'
import { schedulesAfterDate, schedulesAtDate, schedulesBeforeDate } from 'controllers/schedule/match.schedule'

const router: Router = Router({ mergeParams: true } as RouterOptions)

router.get('/', schedulesAtDate)
router.get('/after', schedulesAfterDate)
router.get('/before', schedulesBeforeDate)

export default router
