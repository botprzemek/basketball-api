import {type Request, type Response} from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/sendData.util'

export function staff(req: Request, res: Response): void {
  storage.staff((data: any[]): void => sendData(req, res, data))
}

export function staffById(req: Request, res: Response): void {
  storage.staffByTeamId(BigInt(req.params.id), (data: any[]): void => sendData(req, res, data))
}

export function staffByName(req: Request, res: Response): void {
  storage.staffByTeamName(req.params.name, (data: any[]): void => sendData(req, res, data))
}
