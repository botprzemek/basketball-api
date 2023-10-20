import { Router } from 'express'
import registerAuthorization from 'controllers/authorization/register.authorization'
import loginAuthorization from 'controllers/authorization/login.authorization'
import authenticateAuthorization from 'controllers/authorization/authenticate.authorization'
import verifyAuthorization from 'controllers/authorization/verify.authorization'

const router: Router = Router()

router.post('/register', registerAuthorization)
router.post('/login', loginAuthorization)

router.get('/', authenticateAuthorization)
router.get('/verify', verifyAuthorization)

export default router
