import { Router } from 'express'
import { authenticate, login, register, verify } from 'controllers/auth.controller'

const router: Router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/verify', verify)

export default router
