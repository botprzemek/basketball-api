import { type Request, type Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/send.util'

export async function arenas(req: Request, res: Response): Promise<void> {
	const data: any[] = await storage('arenas')
	sendData(req, res, data)
}

export async function arenasById(req: Request, res: Response): Promise<void> {
	const data: any[] = await storage('arenas', 'arenasById', [BigInt(req.params.id)])
	sendData(req, res, data)
}

export async function arenasByCityId(req: Request, res: Response): Promise<void> {
	const data: any[] = await storage('arenas', 'arenasByCityId', [BigInt(req.params.id)])
	sendData(req, res, data)
}
