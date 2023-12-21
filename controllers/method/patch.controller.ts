import { Request, Response } from 'express'
import Payload from 'types/controller/payload.interface'
import expressions from 'utils/expression.util'
import storageService from 'services/storage.service'
import updateCache from 'services/cache/update.cache'
import QueryEnum from 'types/storage/query.enum'

export default async <Route>(req: Request, res: Response, route: string): Promise<void> => {
	const payload: Payload = {}
	const value = Object.values(req.query).at(0)

	if (!value || Array.isArray(value)) {
		res.sendStatus(204)
		return
	}

	const valid: boolean = Object.keys(expressions[route]).every((key: string): void => {
		payload[key] = req.body[key]
		return expressions[route][key].test(payload[key] as string)
	})

	if (!valid) {
		res.sendStatus(400)
		return
	}

	const key: QueryEnum = (Object.keys(req.query).at(0) as string).toUpperCase() as QueryEnum

	const updatedData: Route[] = await storageService[route].update(key, value, payload)

	if (!updatedData || updatedData.length === 0) {
		res.sendStatus(422)
		return
	}

	updateCache(route, updatedData)

	res.sendStatus(201)

	console.log(
		`${new Date().toLocaleTimeString('pl-PL')} [request] ${req.method} ${decodeURI(
			req.baseUrl + req.path
		)} (${((performance.now() - res.locals.start) / 1000).toFixed(2)}s)`
	)
}
