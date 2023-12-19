import {NextFunction, Request, Response, Router} from 'express'
import controllers from 'controllers/controllers'

const router: Router = Router()
const route: string = 'arenas'

Object.keys(controllers).forEach((key: string): void =>
	router[key](
		'/',
		async (req: Request, res: Response, next: NextFunction): Promise<void> =>
			await controllers[key](req, res, route, next)
	)
)

export default router
