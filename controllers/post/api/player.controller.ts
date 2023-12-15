import { type Request, type Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/send.util'
import { Player } from 'models/api/player.model'

export async function createPlayers(req: Request, res: Response): Promise<void> {
	const data: Player[] = await storage('players')
	sendData(req, res, data)
}
