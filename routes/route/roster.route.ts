import {Request, Response, Router} from 'express'
import {Position} from '@prisma/client'

const router: Router = Router()

router.get('/', (_req: Request, res: Response): void => {
  res.send({
    host: {
      players: [
        {
          name: 'Kornel',
          lastname: 'Suchocki',
          number: 1,
          position: Position.PG,
        },
      ],
    },
    opponent: {
      players: [
        {
          name: 'LeBron',
          lastname: 'James',
          number: 23,
          position: Position.SF,
        },
      ],
    },
  })
})

export default router
