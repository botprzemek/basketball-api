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

	if (!value || Array.isArray(value)) {
		res.locals.data = await storageService[route].get()
		return next()
	}

	const key: QueryEnum = (Object.keys(req.query).at(0) as string).toUpperCase() as QueryEnum
	const isValid: boolean =
		key === QueryEnum.ID || Object.keys(expressions[route]).includes(key.toLowerCase())

	res.locals.data = isValid
		? await storageService[route].get(key, value)
		: await storageService[route].get()

	return next()
}
