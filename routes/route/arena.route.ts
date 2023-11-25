import { Router } from 'express'
import { arenas, arenasById } from 'controllers/api/arena.controller'

const router: Router = Router()

router.get('/', arenas)

router.get('/id/:id', arenasById)

export default router
