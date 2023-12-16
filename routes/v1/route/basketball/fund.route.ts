import { Router } from 'express'
import { getFundsByUrl } from 'controllers/get/basketball/fund.controller'

const router: Router = Router()

router.get('/', getFundsByUrl)

export default router
