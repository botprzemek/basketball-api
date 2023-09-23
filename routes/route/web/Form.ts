import { Router } from 'express'
import send from 'services/mail/Send'

const router = Router()

router.post('/', (_req, _res) => {
  const address: string = 'botprzemek@skiff.com'
  // const { name, lastname, title, description, email, phone } = req.body
  // if (!name || !lastname || !title || !description || !email || !phone) return res.sendStatus(400)
  send(address)
})

export default router
