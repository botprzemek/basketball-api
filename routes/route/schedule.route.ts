import { Router } from 'express'
import { schedules } from 'controllers/api/schedule.controller'
import schedulesBy from './matchBySchedule.route'

const router: Router = Router()

router.get('/', schedules)
router.use('/:date(202[0-9]-[0,1][0-9]-[0,1,2,3][0-9])', schedulesBy)

export default router
