import { type Request, type Response } from 'express'
import queryPrisma from 'services/storage/prisma/query.prisma'

export async function schedules(req: Request, res: Response): Promise<void> {
  res.send(await queryPrisma.schedules())
}
