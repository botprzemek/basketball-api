import { NextFunction, Request, Response } from 'express'
import storageService from 'services/storage.service'
import QueryEnum from 'types/storage/query.enum'
import expressions from 'utils/expression.util'

export default async (
	req: Request,
	res: Response,
	route: string,
	next: NextFunction
): Promise<void> => {
	const value = Object.values(req.query).at(0)
	const key: string | undefined = Object.keys(req.query).at(0)

	if (!key || !value || Array.isArray(value)) {
		res.locals.data = await storageService[route].get()
		return next()
	}

	const query: QueryEnum = key.toUpperCase() as QueryEnum
	const routeExpressions: {} = expressions[route] ? expressions[route] : {}
	const validQuery: QueryEnum = routeExpressions[key.toLowerCase()] ? query : QueryEnum.ID

	const valid: boolean = !!routeExpressions[validQuery.toLowerCase()]

	// parameters[route](Object.keys(query).slice(valid ? 1 : 0),)

	res.locals.data = valid
		? await storageService[route].get(query, value)
		: await storageService[route].get()

	return next()
}
