import { Router } from 'express'
import { arenas, arenasById } from 'controllers/api/arena.controller'

const router: Router = Router()

router.get('/', arenas)

router.get('/id/:id([0-9]{18})', arenasById)

export default router
