import {Router} from 'express'
import error from 'middlewares/error.middleware'
import secret from 'middlewares/key.middleware'
import sendMiddleware from 'middlewares/send.middleware'
import Routes from 'models/routes.interface'
import authRoute from 'routes/v1/route/auth/auth.route'
import arenaRoute from 'routes/v1/route/basketball/arena.route'

const router: Router = Router()

const routes: Routes = {
  auth: authRoute,
  arenas: arenaRoute
  // cities: cityRoute,
  // fund: fundRoute,
  // leagues: leagueRoute,
  // matches: matchRoute,
  // players: playerRoute,
  // rosters: rosterRoute,
  // staff: staffRoute,
  // teams: teamRoute
}

router.use(error).use(secret)

Object.keys(routes).forEach((route: string) =>
  router.use(`/${route}`, routes[route])
)

router.use(sendMiddleware)


export default router
