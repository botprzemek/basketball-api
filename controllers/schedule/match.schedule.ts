import { Request, Response } from 'express'
import queryPrisma from 'services/storage/prisma/query.prisma'

export async function schedulesAtDate(req: Request, res: Response): Promise<void> {
  res.send(await queryPrisma.schedules())
  // sendData(req, res, data)
}

export async function schedulesAfterDate(req: Request, res: Response): Promise<void> {
  res.send(await queryPrisma.schedules())
  // sendData(req, res, data)
}

export async function schedulesBeforeDate(req: Request, res: Response): Promise<void> {
  res.send(await queryPrisma.schedules())
  // sendData(req, res, data)
}
