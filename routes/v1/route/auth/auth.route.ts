import { Router } from 'express'
import registerAuthorization from 'controllers/auth/register.controller'
import loginAuthorization from 'controllers/auth/login.controller'
import authenticateAuthorization from 'controllers/auth/authenticate.controller'
import verifyAuthorization from 'controllers/auth/verify.controller'

const router: Router = Router()

router.post('/register', registerAuthorization)
router.post('/login', loginAuthorization)

router.get('/', authenticateAuthorization)
router.get('/verify', verifyAuthorization)

export default router
