import { Router } from 'express'
import player from './route/player.route'
import team from './route/team.route'
import match from './route/match.route'
import schedule from './route/schedule.route'
import error from '../middlewares/error.middleware'
import secret from '../middlewares/secret.middleware'

const router: Router = Router()

router.use(error)
router.use(secret)

router.use('/teams', team)
router.use('/players', player)
router.use('/matches', match)
router.use('/schedules', schedule)

export default router
