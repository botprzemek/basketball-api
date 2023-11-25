import { type Request, type Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/send.util'

export async function teams(req: Request, res: Response): Promise<void> {
	const data: any[] = await storage('teams')
	sendData(req, res, data)
}

export async function teamsById(req: Request, res: Response): Promise<void> {
	const data: any[] = await storage('teams', 'teamsById', [BigInt(req.params.id)])
	sendData(req, res, data)
}

export async function teamsByName(req: Request, res: Response): Promise<void> {
	const data: any[] = await storage('teams', 'teamsByName', [BigInt(req.params.name)])
	sendData(req, res, data)
}

export async function teamsByCityId(req: Request, res: Response): Promise<void> {
	const data: any[] = await storage('teams', 'teamsByCityId', [BigInt(req.params.id)])
	sendData(req, res, data)
}
