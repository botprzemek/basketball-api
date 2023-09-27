import { Request, Response } from 'express'
import storage from 'services/Storage'
import sendData from 'utils/Data.util'
import { TeamFiltered } from 'models/Query.model'

export async function teams(req: Request, res: Response): Promise<void> {
  const data: TeamFiltered[] = await storage.teams()
  sendData(req, res, data)
}

export async function teamsByName(req: Request, res: Response): Promise<void> {
  const data: TeamFiltered[] = await storage.teamsByName(req.params.team)
  sendData(req, res, data)
}
