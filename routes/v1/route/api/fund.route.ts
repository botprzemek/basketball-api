import { Router } from 'express'
import { fund } from 'controllers/get/api/fund.controller'

const router: Router = Router()

router.get('/', fund)

export default router
