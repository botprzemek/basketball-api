import { Request, Response, Router } from 'express'
import { Player } from '@prisma/client'
import { Player as PlayerBuilder } from 'models/Player'
import storage from 'services/Storage'

const router: Router = Router()

router.get('/', async (req: Request, res: Response): Promise<Response> => {
  const data: Player[] = await storage.players()

  if (!Array.isArray(data) || data.length === 0) {
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] requested players are null`)
    return res.sendStatus(404)
  }

  res.send(data.map((player: Player) => new PlayerBuilder(player)))
  console.log(
    `${new Date().toLocaleTimeString('pl-PL')} [request] GET ${decodeURI(req.baseUrl + req.path)} - requested players (${(
      (performance.now() - res.locals.start) /
      1000
    ).toFixed(2)}s)`,
  )
})

export default router

// TODO

// router.get('/test/:key/:value/:limit?', async (req, res) => {
//     const limit = (req.params.limit) ? parseInt(req.params.limit) : 999
//     const data = await storage().playersByValue(req.params.key, req.params.value, limit)
//
//     if (!players || players.length === 0 || error) {
//         return res.sendStatus(404)
//     }
//
//     if (!Array.isArray(players)) {
//         res.send(new Player(players))
//         return console.log(`${new Date().toLocaleTimeString('pl-PL')} [request] GET ${req.baseUrl + req.path} - requested player ${players.name} ${players.lastname} (${((performance.now() - res.locals.start) / 1000).toFixed(2)}s)`)
//     }
//
//     res.send(players.map((player: PlayerType) => new Player(player)))
//     console.log(`${new Date().toLocaleTimeString('pl-PL')} [request] GET ${req.baseUrl + req.path} - requested ${players.length} players (${((performance.now() - res.locals.start) / 1000).toFixed(2)}s)`)
// })
