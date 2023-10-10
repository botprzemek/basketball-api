import { Request, Response } from 'express'
import { PlayerFiltered } from 'models/data.model'
import storage from 'services/storage.service'
import sendData from 'utils/sendData.util'

export async function playersByTeam(req: Request, res: Response): Promise<void> {
  const data: PlayerFiltered[] = await storage.playersByTeam(req.params.name)
  sendData(req, res, data)
}

// TODO
// export async function playersStatistics(req: Request, res: Response): Promise<void> {
//   const data = await (await initializePrisma()).player.aggregate({
//     _count: {
//       height: true,
//     },
//     _sum: {
//       height: true,
//     },
//   })
//   const avg = {
//     points: data._sum.height / data._count.height
//   }
//   sendData(
//     req,
//     res, [avg])
// }
