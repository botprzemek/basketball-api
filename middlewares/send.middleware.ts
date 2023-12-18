import { type Request, type Response } from 'express'

export default function <RequestType>(req: Request, res: Response): void {
	const data = res.locals.data
	if (!data) {
		res.json({
			data: []
		})
		return
	}
	res.json({
		data: data
	})
	console.log(
		`${new Date().toLocaleTimeString('pl-PL')} [request] ${req.method} ${decodeURI(
			req.baseUrl + req.path
		)} (${((performance.now() - res.locals.start) / 1000).toFixed(2)}s)`
	)
}
