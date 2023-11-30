import { type Request, type Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/send.util'
import { Match } from 'models/api/match.model'

export async function matches(req: Request, res: Response): Promise<void> {
	const data: Match[] = await storage('matches')
	sendData(req, res, data)
}

export async function matchesById(req: Request, res: Response): Promise<void> {
	const data: Match[] = await storage('matches', 'matchesById', [BigInt(req.params.id || 0)])
	sendData(req, res, data)
}

export async function matchesClosest(req: Request, res: Response): Promise<void> {
	const data: Match[] = await storage('matches', 'matchesClosest', [])
	sendData(req, res, data)
}

export async function matchesAfter(req: Request, res: Response): Promise<void> {
	const data: Match[] = await storage('matches', 'matchesAfter', [req.params.date])
	sendData(req, res, data)
}

export async function matchesBefore(req: Request, res: Response): Promise<void> {
	const data: Match[] = await storage('matches', 'matchesBefore', [req.params.date])
	sendData(req, res, data)
}

export async function matchesByDate(req: Request, res: Response): Promise<void> {
	const data: Match[] = await storage('matches', 'matchesByDate', [req.params.date])
	sendData(req, res, data)
}

export async function matchesAfterDate(req: Request, res: Response): Promise<void> {
	const data: Match[] = await storage('matches', 'matchesAfterDate', [req.params.date])
	sendData(req, res, data)
}

export async function matchesBeforeDate(req: Request, res: Response): Promise<void> {
	const data: Match[] = await storage('matches', 'matchesBeforeDate', [req.params.date])
	sendData(req, res, data)
}
