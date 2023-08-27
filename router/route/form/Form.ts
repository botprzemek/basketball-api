import {Router} from 'express'
import transport from '../../../mail/Initialize'
import mail from '../../../mail/Mail'

const router = Router()
transport()

router.post('/', (req, res) => {
    const { name, lastname, title, description, email, phone } = req.body
    if (!name || !lastname || !title || !description || !email || !phone) return res.sendStatus(400)
    mail('botprzemek@skiff.com')
})

export default router