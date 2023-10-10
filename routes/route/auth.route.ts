import { Router } from 'express'
import { authenticate, login, register } from 'controllers/auth.controller'

const router: Router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/', authenticate, (_req, res) => {
  res.status(200).send('Welcome 🙌')
})

export default router
