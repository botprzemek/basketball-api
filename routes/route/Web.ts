import {Router} from 'express'
import form from './web/form/Form'
import files from './web/files/Files'

const router = Router()

router.use('/form', form)
router.use('/files', files)

router.get('/', (req, res) => res.send({ test: "Test" }))

export default router