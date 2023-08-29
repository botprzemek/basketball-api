import {Router} from 'express'
import * as cors from 'cors'
import validate from './Validate'
import players from './route/players/Players'
import web from './route/web/Web'
import form from './route/form/Form'
import files from './route/files/Files'
import error from './route/error/Error'

const router = Router()
const addresses = JSON.parse(process.env.ADDRESSES)
const options = { origin: addresses }

router.use(cors(options))
router.options('*', cors(options))

router.use((err, req, res, next) => res.status(400).send())
router.use((req, res, next) => validate(req, res, next))
router.use('/players', players)
router.use('/web', web)
router.use('/form', form)
router.use('/files', files)
router.use('*', error)

export default router