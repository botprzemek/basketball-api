import {Router} from 'express'
import mail from 'mail/Mail'

const router = Router()

router.post('/', (req, res) => {
    const address = 'botprzemek@skiff.com'
    // const { name, lastname, title, description, email, phone } = req.body
    // if (!name || !lastname || !title || !description || !email || !phone) return res.sendStatus(400)
    mail(address)
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [request] POST ${req.baseUrl + req.path} - sent mail to ${address}`)
})

export default router