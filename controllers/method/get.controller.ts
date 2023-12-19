import {NextFunction, Request, Response} from 'express'
import storageService from 'services/storage.service'
import QueryEnum from 'models/storage/query.enum'

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

	res.locals.data = await storageService[route].get(key, BigInt(value as string))
	return next()
}
