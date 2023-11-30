import { type Request, type Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/send.util'
import { Player } from 'models/api/player.model'

export async function players(req: Request, res: Response): Promise<void> {
	const data: Player[] = await storage('players')
	sendData(req, res, data)
}

export async function playersById(req: Request, res: Response): Promise<void> {
	const data: Player[] = await storage('players', 'playersById', [BigInt(req.params.id || 0)])
	sendData(req, res, data)
}

export async function playersByName(req: Request, res: Response): Promise<void> {
	const data: Player[] = await storage('players', 'playersByName', [req.params.name])
	sendData(req, res, data)
}

export async function playersByTeamId(req: Request, res: Response): Promise<void> {
	const data: Player[] = await storage('players', 'playersByTeamId', [BigInt(req.params.id || 0)])
	sendData(req, res, data)
}
