import { Router } from 'express'
import { leagues } from 'controllers/api/league.controller'

const router: Router = Router()

router.get('/', leagues)

export default router
