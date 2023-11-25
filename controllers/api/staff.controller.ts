import { type Request, type Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/send.util'

export async function staff(req: Request, res: Response): Promise<void> {
	const data: any[] = await storage('staff')
	sendData(req, res, data)
}

export async function staffByTeamId(req: Request, res: Response): Promise<void> {
	const data: any[] = await storage('staff', 'staffByTeamId', [BigInt(req.params.id)])
	sendData(req, res, data)
}
