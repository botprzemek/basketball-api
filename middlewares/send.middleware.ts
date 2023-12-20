import { type Request, type Response } from 'express'

export default function (req: Request, res: Response): void {
	const data: any[] = res.locals.data

	if (!data || !Array.isArray(data) || data.length === 0) {
		res.sendStatus(204)
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
