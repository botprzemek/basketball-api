import {Router} from 'express'
import {staff} from "controllers/api/staff.controller";

const router: Router = Router()

router.get('/', staff)

export default router