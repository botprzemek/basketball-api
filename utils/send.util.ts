import { type Request, type Response } from 'express'

export default function (req: Request, res: Response, data: any[]): void {
	if (!data) {
		res.sendStatus(404)
		return
	}
	res.json(data)
	console.log(
		`${new Date().toLocaleTimeString('pl-PL')} [request] GET ${decodeURI(
			req.baseUrl + req.path
		)} (${((performance.now() - res.locals.start) / 1000).toFixed(2)}s)`
	)
}
