import { Router } from 'express'
import { getStaff } from 'controllers/get/basketball/staff.controller'

const router: Router = Router()

router.get('/', getStaff)

export default router
