import { Router } from 'express'
import { getStaff } from 'controllers/get/api/staff.controller'

const router: Router = Router()

router.get('/', getStaff)

export default router
