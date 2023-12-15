import { Router } from 'express'
import error from '../../middlewares/error.middleware'
import secret from '../../middlewares/key.middleware'
import authRoute from './route/auth/auth.route'
import arenaRoute from 'routes/v1/route/api/arena.route'
import cityRoute from 'routes/v1/route/api/city.route'
import fundRoute from 'routes/v1/route/api/fund.route'
import leagueRoute from 'routes/v1/route/api/league.route'
import matchRoute from 'routes/v1/route/api/match.route'
import playerRoute from 'routes/v1/route/api/player.route'
import rosterRoute from 'routes/v1/route/api/roster.route'
import staffRoute from 'routes/v1/route/api/staff.route'
import teamRoute from 'routes/v1/route/api/team.route'

const router: Router = Router()

router.use(error).use(secret)

const routes = {
	auth: authRoute,
	arenas: arenaRoute,
	cities: cityRoute,
	fund: fundRoute,
	leagues: leagueRoute,
	matches: matchRoute,
	players: playerRoute,
	rosters: rosterRoute,
	staff: staffRoute,
	teams: teamRoute
}

Object.keys(routes).forEach((route: string) => router.use(`/${route}`, routes[route]))

export default router
