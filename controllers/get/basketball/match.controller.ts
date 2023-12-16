import { type Request, type Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/send.util'
import { Match } from 'models/basketball/match.model'

export async function getMatches(req: Request, res: Response): Promise<void> {
	const data: Match[] = await storage('matches')
	sendData(req, res, data)
}

export async function getMatchesById(req: Request, res: Response): Promise<void> {
	const data: Match[] = await storage('matches', 'matchesById', [
		req.params.id ? BigInt(req.params.id) : 0
	])
	sendData(req, res, data)
}

export async function getMatchesClosest(req: Request, res: Response): Promise<void> {
	const data: Match[] = await storage('matches', 'matchesClosest', [])
	sendData(req, res, data)
}

export async function getMatchesAfter(req: Request, res: Response): Promise<void> {
	const data: Match[] = await storage('matches', 'matchesAfter', [req.params.date])
	sendData(req, res, data)
}

export async function getMatchesBefore(req: Request, res: Response): Promise<void> {
	const data: Match[] = await storage('matches', 'matchesBefore', [req.params.date])
	sendData(req, res, data)
}

export async function getMatchesByDate(req: Request, res: Response): Promise<void> {
	const data: Match[] = await storage('matches', 'matchesByDate', [req.params.date])
	sendData(req, res, data)
}

export async function getMatchesAfterDate(req: Request, res: Response): Promise<void> {
	const data: Match[] = await storage('matches', 'matchesAfterDate', [req.params.date])
	sendData(req, res, data)
}

export async function getMatchesBeforeDate(req: Request, res: Response): Promise<void> {
	const data: Match[] = await storage('matches', 'matchesBeforeDate', [req.params.date])
	sendData(req, res, data)
}
