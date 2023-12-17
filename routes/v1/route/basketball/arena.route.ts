import {Router} from 'express'
import {getArenas} from 'controllers/get/basketball/arena.controller'

const router: Router = Router()

router.get('/', getArenas)

export default router
