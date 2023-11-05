import {Request, Response, Router} from 'express'
import PositionType from 'models/game/type/position.model'

const router: Router = Router()

router.get('/', (_req: Request, res: Response): void => {
  res.send({
    host: {
      name: 'Golden State Warriors',
      players: [
        {
          name: 'Stephen',
          lastname: 'Curry',
          number: 30,
          position: PositionType.PG,
          starting: true,
        },
      ],
    },
    opponent: {
      name: 'Los Angeles Lakers',
      players: [
        {
          name: 'LeBron',
          lastname: 'James',
          number: 23,
          position: PositionType.SF,
          starting: true,
        },
      ],
    },
  })
})

export default router
