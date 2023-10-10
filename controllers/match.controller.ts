import { type Request, type Response } from 'express'
import { type MatchFiltered } from 'models/data.model'
import storage from 'services/storage.service'
import sendUtil from 'utils/sendData.util'
import queryPrisma from 'services/storage/prisma/query.prisma'

export async function matches(req: Request, res: Response): Promise<void> {
  const data: MatchFiltered[] = await storage.matches()
  sendUtil(req, res, await queryPrisma.matches())
}

export async function matchesByDate(req: Request, res: Response): Promise<void> {
  const data: MatchFiltered[] = await storage.matchesByDate(req.params.date)
  sendUtil(req, res, data)
}
