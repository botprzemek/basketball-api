import { Router } from 'express'
import { cities, citiesById, citiesByName } from 'controllers/api/city.controller'
import { arenasByCityId } from 'controllers/api/arena.controller'
import { teamsByCityId } from 'controllers/api/team.controller'

const router: Router = Router()

router.get('/', cities)

router.get('/id/:id', citiesById)
router.get('/id/:id/arenas', arenasByCityId)
router.get('/id/:id/teams', teamsByCityId)

router.get('/name/:name', citiesByName)

export default router
