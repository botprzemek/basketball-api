import {NextFunction, Request, Response} from 'express'
import QueryEnum from "models/storage/query.enum";
import storageService from "services/storage.service";

export default async <Route>(req: Request, res: Response, route: string, next: NextFunction): Promise<void> => {
	const value = Object.values(req.query).at(0)

	if (!value || Array.isArray(value)) {
		res.sendStatus(204)
		console.log(
			`${new Date().toLocaleTimeString('pl-PL')} [request] ${req.method} ${decodeURI(
				req.baseUrl + req.path
			)} (${((performance.now() - res.locals.start) / 1000).toFixed(2)}s)`
		)
		return next()
	}

	const key: QueryEnum = (Object.keys(req.query).at(0) as string).toUpperCase() as QueryEnum

	const data: boolean = await storageService[route].delete(key, BigInt(value as string))

	res.sendStatus(data ? 200 : 410)

	console.log(
		`${new Date().toLocaleTimeString('pl-PL')} [request] ${req.method} ${decodeURI(
			req.baseUrl + req.path
		)} (${((performance.now() - res.locals.start) / 1000).toFixed(2)}s)`
	)
}
