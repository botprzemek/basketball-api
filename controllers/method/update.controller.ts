import { NextFunction, Request, Response } from 'express'
import QueryEnum from 'types/storage/query.enum'
import storageService from 'services/storage.service'
import Payload from 'types/controller/payload.interface'
import expressions from 'utils/expression.util'
import createKeys from 'utils/identifier.util'

// TODO

export default async <Route>(
	req: Request,
	res: Response,
	route: string,
	next: NextFunction
): Promise<void> => {
	const payload: Payload = {}
	const valid: boolean = Object.keys(expressions[route]).every((key: string): void => {
		payload[key] = req.body[key]
		return expressions[route][key].test(payload[key] as string)
	})

	if (!valid) {
		res.sendStatus(400)
		console.log(
			`${new Date().toLocaleTimeString('pl-PL')} [request] ${req.method} ${decodeURI(
				req.baseUrl + req.path
			)} (${((performance.now() - res.locals.start) / 1000).toFixed(2)}s)`
		)
		return
	}

	const data: Route[] = await storageService[route].create(
		createKeys[route],
		...Object.values(payload)
	)

	res.sendStatus(data.length !== 0 ? 201 : 422)
	console.log(
		`${new Date().toLocaleTimeString('pl-PL')} [request] ${req.method} ${decodeURI(
			req.baseUrl + req.path
		)} (${((performance.now() - res.locals.start) / 1000).toFixed(2)}s)`
	)
}
