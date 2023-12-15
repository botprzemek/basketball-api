import { type Request, type Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/send.util'
import { Player } from 'models/api/player.model'

export async function getPlayers(req: Request, res: Response): Promise<void> {
	const data: Player[] = await storage('players')
	sendData(req, res, data)
}

export async function getPlayersById(req: Request, res: Response): Promise<void> {
	const data: Player[] = await storage('players', 'playersById', [
		req.params.id ? BigInt(req.params.id) : 0
	])
	sendData(req, res, data)
}

export async function getPlayersByName(req: Request, res: Response): Promise<void> {
	const data: Player[] = await storage('players', 'playersByName', [req.params.name])
	sendData(req, res, data)
}

export async function getPlayersByTeamId(req: Request, res: Response): Promise<void> {
	const data: Player[] = await storage('players', 'playersByTeamId', [
		req.params.id ? BigInt(req.params.id) : 0
	])
	sendData(req, res, data)
}
