import { Router } from 'express'
import {
	createArenas,
	deleteArenas,
	getArenas,
	updateArenas
} from 'controllers/get/basketball/arena.controller'

const router: Router = Router()

router.post('/', createArenas)
router.patch('/', updateArenas)
router.get('/', getArenas)
router.delete('/', deleteArenas)

export default router
