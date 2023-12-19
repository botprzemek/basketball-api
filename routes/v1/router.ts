import { Router } from 'express'
import error from 'middlewares/error.middleware'
import secret from 'middlewares/key.middleware'
import sendMiddleware from 'middlewares/send.middleware'
import getRouter from 'routes/v1/route/get.route'
import authRoute from 'routes/v1/route/auth/auth.route'
import routes from 'utils/route.util'

const router: Router = Router()

router.use(error).use(secret)

router.use(`/auth`, authRoute)

routes.forEach((route: string) => router.use(`/${route}`, getRouter(route)))

router.use(sendMiddleware)

export default router
