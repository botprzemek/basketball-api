import {Request, Response} from 'express'
import Payload from 'types/controller/payload.interface'
import storageService from 'services/storage.service'
import expressions from 'utils/expression.util'
import sortCache from 'services/cache/sort.cache'

export default async <Route>(req: Request, res: Response, route: string): Promise<void> => {
	const payload: Payload = {}
	const valid: boolean = Object.keys(expressions[route]).every((key: string): void => {
		payload[key] = req.body[key]
		return expressions[route][key].test(payload[key] as string)
	})

	if (!valid) {
		res.sendStatus(400)
		return
	}

	const createdData: Route[] = await storageService[route].create(payload)

	console.log(createdData)

	if (!createdData || createdData.length === 0) {
		res.sendStatus(422)
		return
	}

	sortCache(route, createdData)

	res.sendStatus(201)

	console.log(
		`${new Date().toLocaleTimeString('pl-PL')} [request] ${req.method} ${decodeURI(
			req.baseUrl + req.path
		)} (${((performance.now() - res.locals.start) / 1000).toFixed(2)}s)`
	)
}
