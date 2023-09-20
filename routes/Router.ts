import {Router} from 'express'
import player from 'routes/route/Player.route'
import team from './route/Team.route'
import match from './route/Match.route'
import web from './route/Web.route'
import schedule from './route/Schedule.route'
import error from '../middlewares/Error.middleware'
import secret from '../middlewares/Secret.middleware'

const router: Router = Router()

router.use(error)
router.use(secret)

router.use('/teams', team)
router.use('/players', player)
router.use('/matches', match)
router.use('/schedules', schedule)
router.use('/web', web)

export default router
