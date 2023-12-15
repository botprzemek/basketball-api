import { type Request, type Response } from 'express'

export default function (_req: Request, res: Response): void {
	res.status(404)
	res.json({
		error: {
			description:
				'Please provide a valid path and parameters for a resource, refer to the API documentation'
		}
	})
}
