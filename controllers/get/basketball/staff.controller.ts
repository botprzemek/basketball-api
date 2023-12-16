import { type Request, type Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/send.util'
import { Staff } from 'models/basketball/staff.model'

export async function getStaff(req: Request, res: Response): Promise<void> {
	const data: Staff[] = await storage('staff')
	sendData(req, res, data)
}

export async function getStaffByTeamId(req: Request, res: Response): Promise<void> {
	const data: Staff[] = await storage('staff', 'staffByTeamId', [
		req.params.id ? BigInt(req.params.id) : 0
	])
	sendData(req, res, data)
}
