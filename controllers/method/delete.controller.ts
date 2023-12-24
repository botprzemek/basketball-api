import { Request, Response } from 'express'
import QueryEnum from 'types/storage/query.enum'
import storageService from 'services/storage.service'
import filterCache from 'services/cache/filter.cache'
import expressions from 'utils/expression.util'

export default async <Route>(req: Request, res: Response, route: string): Promise<void> => {
	const value = Object.values(req.query).at(0)

	if (!value || Array.isArray(value)) {
		res.sendStatus(204)
		return
	}

	const key: QueryEnum = (Object.keys(req.query).at(0) as string).toUpperCase() as QueryEnum

	const query: QueryEnum = key.toUpperCase() as QueryEnum
	const routeExpressions: {} = expressions[route] ? expressions[route] : {}
	const validQuery: QueryEnum = routeExpressions[key.toLowerCase()] ? query : QueryEnum.ID

	const valid: boolean = !!routeExpressions[validQuery.toLowerCase()]

	if (!valid) {
		res.sendStatus(204)
		return
	}

	const deletedData: Route[] = await storageService[route].delete(key, value as string)

	if (!deletedData || deletedData.length === 0) {
		res.sendStatus(410)
		return
	}

	filterCache<Route>(route, key, deletedData)

	res.sendStatus(200)

	console.log(
		`${new Date().toLocaleTimeString('pl-PL')} [request] ${req.method} ${decodeURI(
			req.baseUrl + req.path
		)} (${((performance.now() - res.locals.start) / 1000).toFixed(2)}s)`
	)
}
