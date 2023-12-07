import { Router } from 'express'
import { leagues, leaguesById } from 'controllers/api/league.controller'

const router: Router = Router()

router.get('/', leagues)

router.get('/id/:id([0-9]{18})', leaguesById)

export default router
