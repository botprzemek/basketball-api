import { Router } from 'express'
import {
	getCities,
	getCitiesById,
	getCitiesByName
} from 'controllers/get/basketball/city.controller'
import { getArenasByCityId } from 'controllers/get/basketball/arena.controller'
import { getTeamsByCityId } from 'controllers/get/basketball/team.controller'

const router: Router = Router()

router.get('/', getCities)

router.get('/id/:id([0-9]{18})', getCitiesById)
router.get('/id/:id([0-9]{18})/arenas', getArenasByCityId)
router.get('/id/:id([0-9]{18})/teams', getTeamsByCityId)

router.get('/name/:name', getCitiesByName)

export default router
