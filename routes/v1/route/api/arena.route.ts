import { Router } from 'express'
import { getArenas, getArenasById } from 'controllers/get/api/arena.controller'

const router: Router = Router()

router.get('/', getArenas)

router.get('/id/:id([0-9]{18})', getArenasById)

export default router
