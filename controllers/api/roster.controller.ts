import { type Request, type Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/send.util'
import { Roster } from 'models/api/roster.model'

export async function rosters(req: Request, res: Response): Promise<void> {
	const data: Roster[] = await storage('rosters')
	sendData(req, res, data)
}

export async function rostersById(req: Request, res: Response): Promise<void> {
	const data: Roster[] = await storage('rosters', 'rostersById', [BigInt(req.params.id)])
	sendData(req, res, data)
}

export async function rostersByMatchId(req: Request, res: Response): Promise<void> {
	const data: Roster[] = await storage('rosters', 'rostersByMatchId', [BigInt(req.params.id)])
	sendData(req, res, data)
}
