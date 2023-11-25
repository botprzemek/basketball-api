import { Router } from 'express'
import { leagues, leaguesById } from 'controllers/api/league.controller'

const router: Router = Router()

router.get('/', leagues)

router.get('/id/:id', leaguesById)

export default router
