import {type Request, type Response} from 'express'
import storage from 'services/storage.service'
import {TeamFiltered} from 'models/query/data.model'
import sendData from 'utils/sendData.util'

export function teams(req: Request, res: Response): void {
  storage.teams((data: TeamFiltered[]): void => sendData(req, res, data))
}

export async function teamsById(req: Request, res: Response): Promise<void> {
  storage.teamsById(BigInt(req.params.id), (data: TeamFiltered[]): void => sendData(req, res, data))
}

export async function teamsByName(req: Request, res: Response): Promise<void> {
  storage.teamsByName(req.params.name, (data: TeamFiltered[]): void => sendData(req, res, data))
}
