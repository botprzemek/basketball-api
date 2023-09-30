import {Router} from 'express'
import {schedules} from 'controllers/schedule.controller'
import schedulesBy from './schedule/match.schedule'

const router: Router = Router()

router.get('/', schedules)
router.use('/:date', schedulesBy)

export default router
