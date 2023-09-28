import { Request, Response, Router, RouterOptions } from 'express'

const router: Router = Router({ mergeParams: true } as RouterOptions)

router.get('/players', (req: Request, res: Response): void => {
  // const data: PlayerFiltered[] = await storage.playersByTeam(req.params.team)
  //
  // if (!Array.isArray(data) || data.length === 0) {
  //   console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] requested players are null`)
  //   return res.sendStatus(404)
  // }
  //
  // res.send(data)
  // console.log(
  //   `${new Date().toLocaleTimeString('pl-PL')} [request] GET ${decodeURI(req.baseUrl + req.path)} - requested players from ${req.params.team} (${(
  //     (performance.now() - res.locals.start) /
  //     1000
  //   ).toFixed(2)}s)`,
  // )
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
//         res.send(new PlayerModel(players))
//         return console.log(`${new Date().toLocaleTimeString('pl-PL')} [request] GET ${req.baseUrl + req.path} - requested player ${players.name} ${players.lastname} (${((performance.now() - res.locals.start) / 1000).toFixed(2)}s)`)
//     }
//
//     res.send(players.map((player: PlayerType) => new PlayerModel(player)))
//     console.log(`${new Date().toLocaleTimeString('pl-PL')} [request] GET ${req.baseUrl + req.path} - requested ${players.length} players (${((performance.now() - res.locals.start) / 1000).toFixed(2)}s)`)
// })
