import { Request, Response, Router } from 'express'
import { Team } from '@prisma/client'
import storage from 'services/Storage'
import player from './team/Player'

const router: Router = Router()

router.get('/', async (req: Request, res: Response): Promise<Response> => {
  const data: Team[] = await storage.teams()

  if (!Array.isArray(data) || data.length === 0) {
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] requested teams are null`)
    return res.sendStatus(404)
  }

  res.send(data)
  console.log(
    `${new Date().toLocaleTimeString('pl-PL')} [request] GET ${decodeURI(req.baseUrl + req.path)} - requested teams (${(
      (performance.now() - res.locals.start) /
      1000
    ).toFixed(2)}s)`,
  )
})

router.get('/:team', async (req: Request, res: Response): Promise<Response> => {
  const data: Team[] = await storage.teamsByName(req.params.team)

  if (!Array.isArray(data) || data.length === 0) {
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] requested team is null`)
    return res.sendStatus(404)
  }

  res.send(data)
  console.log(
    `${new Date().toLocaleTimeString('pl-PL')} [request] GET ${decodeURI(req.baseUrl + req.path)} - requested team (${(
      (performance.now() - res.locals.start) /
      1000
    ).toFixed(2)}s)`,
  )
})

router.use('/:team', player)

export default router
