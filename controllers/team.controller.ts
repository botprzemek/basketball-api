import { Request, Response } from 'express'
import storage from 'services/storage.service'
import sendData from 'utils/reponse.util'
import { TeamFiltered } from 'models/query.model'

export async function teams(req: Request, res: Response): Promise<void> {
  const data: TeamFiltered[] = await storage.teams()
  sendData(req, res, data)
}

export async function teamsByName(req: Request, res: Response): Promise<void> {
  const data: TeamFiltered[] = await storage.teamsByName(req.params.name)
  sendData(req, res, data)
}
