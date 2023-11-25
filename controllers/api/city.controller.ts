import { type Request, type Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/send.util'

export async function cities(req: Request, res: Response): Promise<void> {
	const data: any[] = await storage('cities')
	sendData(req, res, data)
}

export async function citiesById(req: Request, res: Response): Promise<void> {
	const data: any[] = await storage('cities', 'citiesById', [BigInt(req.params.id)])
	sendData(req, res, data)
}

export async function citiesByName(req: Request, res: Response): Promise<void> {
	const data: any[] = await storage('cities', 'citiesByName', [req.params.name])
	sendData(req, res, data)
}
