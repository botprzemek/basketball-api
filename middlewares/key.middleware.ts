import { type NextFunction, type Request, type Response } from 'express'
import settingsConfig from 'configs/default.config'

export default function (req: Request, res: Response, next: NextFunction): void {
	if (
		req.ip === '::ffff:127.0.0.1' ||
		!settingsConfig.useSecret ||
		req.headers['x-api-key'] === process.env.SECRET
	) {
		res.locals.start = performance.now()
		next()
		return
	}

	console.log(
		`${new Date().toLocaleTimeString('pl-PL')} [server] unauthorized access (${
			req.headers['x-real-ip'] || req.ip
		})`
	)

	res.status(401)
	res.json({
		error: {
			description:
				'Please provide a valid authorization token, refer to the API documentation'
		}
	})
}
