import { Router } from 'express'
import { rosters, rostersById } from 'controllers/get/api/roster.controller'

const router: Router = Router()

router.get('/', rosters)

router.get('/id/:id([0-9]{18})', rostersById)

export default router
