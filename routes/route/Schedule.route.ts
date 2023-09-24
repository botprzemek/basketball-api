import { Request, Response, Router } from 'express'
import storage from 'services/Storage'

const router: Router = Router()

router.get('/', async (req: Request, res: Response): Promise<void> => {
  const data = await storage.schedules()

  res.send(data)
  console.log(
    `${new Date().toLocaleTimeString('pl-PL')} [request] GET ${decodeURI(req.baseUrl + req.path)} - requested schedules (${(
      (performance.now() - res.locals.start) /
      1000
    ).toFixed(2)}s)`,
  )
})

export default router
