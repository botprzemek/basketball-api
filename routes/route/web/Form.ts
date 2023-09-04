import { Router } from 'express'
import send from 'services/mail/Send'

const router = Router()

router.post('/', (req, res) => {
  const address = 'botprzemek@skiff.com'
  // const { name, lastname, title, description, email, phone } = req.body
  // if (!name || !lastname || !title || !description || !email || !phone) return res.sendStatus(400)
  send(address)
  console.log(`${new Date().toLocaleTimeString('pl-PL')} [request] POST ${req.baseUrl + req.path} - sent mail to ${address}`)
})

export default router
