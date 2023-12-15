import { type Request, type Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/send.util'
import { Roster } from 'models/api/roster.model'

export async function getRosters(req: Request, res: Response): Promise<void> {
	const data: Roster[] = await storage('rosters')
	sendData(req, res, data)
}

export async function getRostersById(req: Request, res: Response): Promise<void> {
	const data: Roster[] = await storage('rosters', 'rostersById', [
		req.params.id ? BigInt(req.params.id) : 0
	])
	sendData(req, res, data)
}

export async function getRostersByMatchId(req: Request, res: Response): Promise<void> {
	const data: Roster[] = await storage('rosters', 'rostersByMatchId', [
		req.params.id ? BigInt(req.params.id) : 0
	])
	sendData(req, res, data)
}
