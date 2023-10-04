import { type Request, type Response } from 'express'
import { LeagueFiltered } from 'models/data.model'
import storage from 'services/storage.service'
import sendUtil from 'utils/sendData.util'

export async function leagues(req: Request, res: Response): Promise<void> {
  const data: LeagueFiltered[] = await storage.leagues()
  sendUtil(req, res, data)
}
