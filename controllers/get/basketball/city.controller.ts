import { type Request, type Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/send.util'
import { City } from 'models/basketball/city.model'

export async function getCities(req: Request, res: Response): Promise<void> {
	const data: City[] = await storage('cities')
	sendData(req, res, data)
}

export async function getCitiesById(req: Request, res: Response): Promise<void> {
	const data: City[] = await storage('cities', 'citiesById', [
		req.params.id ? BigInt(req.params.id) : 0
	])
	sendData(req, res, data)
}

export async function getCitiesByName(req: Request, res: Response): Promise<void> {
	const data: City[] = await storage('cities', 'citiesByName', [req.params.name])
	sendData(req, res, data)
}
