import { type Request, type Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/send.util'
import { Match } from 'models/api/match.model'

export async function matches(req: Request, res: Response): Promise<void> {
	const data: Match[] = await storage('matches')
	sendData(req, res, data)
}

export async function matchesById(req: Request, res: Response): Promise<void> {
	const data: Match[] = await storage('matches', 'matchesById', [BigInt(req.params.id)])
	sendData(req, res, data)
}

export async function matchesByClosest(req: Request, res: Response): Promise<void> {
	const data: Match[] = await storage('matches', 'matchesByClosest', [])
	sendData(req, res, data)
}

export async function matchesByDate(req: Request, res: Response): Promise<void> {
	const data: Match[] = await storage('matches', 'matchesByDate', [req.params.date])
	sendData(req, res, data)
}

export async function matchesAfterDate(req: Request, res: Response): Promise<void> {
	const data: Match[] = await storage('matches', 'matchesByDate', [req.params.date])
	sendData(req, res, data)
}

export async function matchesBeforeDate(req: Request, res: Response): Promise<void> {
	const data: Match[] = await storage('matches', 'matchesByDate', [req.params.date])
	sendData(req, res, data)
}
