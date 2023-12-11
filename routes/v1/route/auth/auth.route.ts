import { Router } from 'express'
import registerAuthorization from 'controllers/get/auth/register.controller'
import loginAuthorization from 'controllers/get/auth/login.controller'
import authenticateAuthorization from 'controllers/get/auth/authenticate.controller'
import verifyAuthorization from 'controllers/get/auth/verify.controller'

const router: Router = Router()

router.post('/register', registerAuthorization)
router.post('/login', loginAuthorization)

router.get('/', authenticateAuthorization)
router.get('/verify', verifyAuthorization)

export default router
