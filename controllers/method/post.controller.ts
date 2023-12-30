import { Request, Response } from 'express'
import Payload from 'types/controller/payload.interface'
import storageService from 'services/storage.service'
import expressions from 'utils/expression.util'

export default async <Route>(req: Request, res: Response, route: string): Promise<void> => {
	const payload: Payload = {}
	let valid: boolean = false

	Object.keys(expressions[route]).forEach((key: string): void => {
		payload[key] = req.body[key]
		valid = expressions[route][key].test(payload[key] as string)
	})

	if (!valid) {
		res.sendStatus(400)
		return
	}

	const createdData: Route[] = await storageService[route].create(payload)

	if (!createdData || createdData.length === 0) {
		res.status(422)
		return
	}

	res.sendStatus(201)

	console.log(
		`${new Date().toLocaleTimeString('pl-PL')} [request] ${req.method} ${decodeURI(
			req.baseUrl + req.path
		)} (${((performance.now() - res.locals.start) / 1000).toFixed(2)}s)`
	)
}
