import { Router } from 'express'
import Route from 'models/route.interface'
import error from '../../middlewares/error.middleware'
import secret from '../../middlewares/key.middleware'
import authRoute from './route/auth/auth.route'
import arenaRoute from 'routes/v1/route/basketball/arena.route'
import cityRoute from 'routes/v1/route/basketball/city.route'
import fundRoute from 'routes/v1/route/basketball/fund.route'
import leagueRoute from 'routes/v1/route/basketball/league.route'
import matchRoute from 'routes/v1/route/basketball/match.route'
import playerRoute from 'routes/v1/route/basketball/player.route'
import rosterRoute from 'routes/v1/route/basketball/roster.route'
import staffRoute from 'routes/v1/route/basketball/staff.route'
import teamRoute from 'routes/v1/route/basketball/team.route'

const router: Router = Router()

const routes: Route = {
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

router.use(error).use(secret)

Object.keys(routes).forEach((route: string) => router.use(`/${route}`, routes[route]))

export default router
