import { type Request, type Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/send.util'
import { Arena } from 'models/basketball/arena.model'

export async function getArenas(req: Request, res: Response): Promise<void> {
	const data: Arena[] = await storage('arenas')
	sendData(req, res, data)
}

export async function getArenasById(req: Request, res: Response): Promise<void> {
	const data: Arena[] = await storage('arenas', 'arenasById', [
		req.params.id ? BigInt(req.params.id) : 0
	])
	sendData(req, res, data)
}

export async function getArenasByCityId(req: Request, res: Response): Promise<void> {
	const data: Arena[] = await storage('arenas', 'arenasByCityId', [
		req.params.id ? BigInt(req.params.id) : 0
	])
	sendData(req, res, data)
}
