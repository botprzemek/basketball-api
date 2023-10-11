import {Router} from 'express'
import {authenticate, login, register, verify} from 'controllers/auth.controller'

const router: Router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/verify', verify)
router.post('/', authenticate, (_req, res) => {
  res.status(200)
})

export default router
