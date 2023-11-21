import { Router } from 'express'
import error from '../middlewares/error.middleware'
import secret from '../middlewares/secret.middleware'
import auth from './route/auth.route'
import fund from 'routes/route/fund.route'
import player from './route/player.route'
import staff from './route/staff.route'
import team from './route/team.route'
import schedule from './route/schedule.route'
import league from './route/league.route'

const router: Router = Router()

router.use(error)
router.use(secret)

router.use('/auth', auth)
router.use('/fund', fund)
router.use('/players', player)
router.use('/staff', staff)
router.use('/teams', team)
router.use('/schedules', schedule)
router.use('/leagues', league)

export default router

// TODO
//
// player
//
// staff
//
// statistics
//
// team
//
// match
//
// schedule
//
// roster
//
// league
