import {NextFunction, type Request, type Response} from 'express'
import {Arena} from 'models/basketball/arena.model'
import storageService from 'services/storage.service'
import QueryEnum from "models/storage/query.enum";

export async function getArenas(req: Request, res: Response, next: NextFunction): Promise<void> {

	if (req.query.id) {
		const data = await storageService.arenas.get(QueryEnum.ID, req.query.id ? BigInt(req.query.id as string) : 0)
		res.locals.data = data
		return next()
	}

	if (req.query.city_id) {
		const data: Arena[] = await storageService.arenas.get(QueryEnum.CITY_ID, req.query.city_id ? BigInt(req.query.city_id as string) : 0)
		res.locals.data = data
		return next()
	}

	const data: Arena[] = await storageService.arenas.get()
	res.locals.data = data
	next()
}