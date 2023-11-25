import { Router } from 'express'
import { rosters, rostersById } from 'controllers/api/roster.controller'

const router: Router = Router()

router.get('/', rosters)

router.get('/id/:id', rostersById)

export default router
