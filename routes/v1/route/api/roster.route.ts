import { Router } from 'express'
import { getRosters, getRostersById } from 'controllers/get/basketball/roster.controller'

const router: Router = Router()

router.get('/', getRosters)

router.get('/id/:id([0-9]{18})', getRostersById)

export default router
