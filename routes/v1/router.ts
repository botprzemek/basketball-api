import {Router} from 'express'
import error from '../../middlewares/error.middleware'
import secret from '../../middlewares/secret.middleware'
import authRoute from './route/auth.route'
import arenaRoute from 'routes/v1/route/arena.route'
import cityRoute from 'routes/v1/route/city.route'
import fundRoute from 'routes/v1/route/fund.route'
import leagueRoute from 'routes/v1/route/league.route'
import matchRoute from 'routes/v1/route/match.route'
import playerRoute from 'routes/v1/route/player.route'
import rosterRoute from 'routes/v1/route/roster.route'
import staffRoute from 'routes/v1/route/staff.route'
import teamRoute from 'routes/v1/route/team.route'

const router: Router = Router()

router.use(error)
router.use(secret)

router.use('/auth', authRoute)
router.use('/arenas', arenaRoute)
router.use('/cities', cityRoute)
router.use('/fund', fundRoute)
router.use('/leagues', leagueRoute)
router.use('/matches', matchRoute)
router.use('/players', playerRoute)
router.use('/rosters', rosterRoute)
router.use('/staff', staffRoute)
router.use('/teams', teamRoute)

export default router
