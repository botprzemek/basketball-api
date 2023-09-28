import { type Request, type Response } from 'express'
import { type MatchFiltered } from 'models/query.model'
import storage from 'services/storage.service'
import sendUtil from 'utils/send.util'

export async function matches(req: Request, res: Response): Promise<void> {
  const data: MatchFiltered[] = await storage.matches()
  sendUtil(req, res, data)
}

export async function matchesByDate(req: Request, res: Response): Promise<void> {
  const data: MatchFiltered[] = await storage.matchesByDate(req.params.date)
  sendUtil(req, res, data)
}