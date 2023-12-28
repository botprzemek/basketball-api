import { Router } from 'express'
import error from 'middlewares/error.middleware'
import secret from 'middlewares/key.middleware'
import send from 'middlewares/send.middleware'
import getRouter from 'routes/v1/router/route.router'
import authRoute from 'routes/v1/router/route/auth.route'
import routes from 'utils/route.util'

const router: Router = Router()

router.use(error).use(secret)

router.use('/auth', authRoute)

Object.keys(routes).forEach((route: string) => router.use(`/${route}`, getRouter(route)))

router.use(send)

export default router
