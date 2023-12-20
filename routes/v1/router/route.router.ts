import { NextFunction, Request, Response, Router } from 'express'
import controllers from 'controllers/controllers'

export default (route: string): Router => {
	const router: Router = Router()

	Object.keys(controllers).forEach((key: string): void =>
		router[key](
			'/',
			async (req: Request, res: Response, next: NextFunction): Promise<void> =>
				controllers[key](req, res, route, next)
		)
	)

	return router
}
