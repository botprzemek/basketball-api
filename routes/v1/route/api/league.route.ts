import {Router} from 'express'
import {getLeagues, getLeaguesById} from 'controllers/get/api/league.controller'

const router: Router = Router()

router.get('/', getLeagues)

router.get('/id/:id([0-9]{18})', getLeaguesById)

export default router
