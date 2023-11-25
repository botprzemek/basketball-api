import { Router } from 'express'
import error from '../middlewares/error.middleware'
import secret from '../middlewares/secret.middleware'
import authRoute from './route/auth.route'
import arenaRoute from 'routes/route/arena.route'
import cityRoute from 'routes/route/city.route'
import fundRoute from 'routes/route/fund.route'
import leagueRoute from 'routes/route/league.route'
import matchRoute from 'routes/route/match.route'
import playerRoute from 'routes/route/player.route'
import rosterRoute from 'routes/route/roster.route'
import staffRoute from 'routes/route/staff.route'
import teamRoute from 'routes/route/team.route'

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
