import {Router} from 'express'
import {getFundsByUrl} from 'controllers/get/api/fund.controller'

const router: Router = Router()

router.get('/', getFundsByUrl)

export default router
