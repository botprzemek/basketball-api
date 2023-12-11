import {type Request, type Response} from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/send.util'
import {League} from 'models/api/league.model'

export async function getLeagues(req: Request, res: Response): Promise<void> {
	const data: League[] = await storage('leagues')
	sendData(req, res, data)
}

export async function getLeaguesById(req: Request, res: Response): Promise<void> {
	const data: League[] = await storage('leagues', 'leaguesById', [
		req.params.id ? BigInt(req.params.id) : 0
	])
	sendData(req, res, data)
}
