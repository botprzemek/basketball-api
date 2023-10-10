import {NextFunction, Request, Response} from 'express'
import initializeSqlite from 'services/storage/sqlite/initialize.sqlite'
import {compare, hash} from 'bcrypt'
import {sign, verify} from 'jsonwebtoken'

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { first_name, last_name, email, password } = req.body

    if (!(email && password && first_name && last_name)) {
      res.sendStatus(404)
      return
    }

    const database: any = await initializeSqlite()
    const isUser: boolean = !!(await database.get(`SELECT * FROM users WHERE email = ?`, [email.toLowerCase()]))

    if (isUser) {
      res.sendStatus(404)
      return
    }

    const encryptedPassword: string = await hash(password, 10)
    const user = {
      email: email,
      token: '',
    }

    user.token = sign(
      {
        user_id: (
          await database.run(`INSERT INTO users(first_name, last_name, email, password, verified, address) VALUES (?, ?, ?, ?, ?, ?)`, [
            first_name.toLowerCase(),
            last_name.toLowerCase(),
            email.toLowerCase(),
            encryptedPassword,
            0,
            req.ip,
          ])
        ).lastID,
        email,
      },
      process.env.TOKEN_KEY as string,
      {
        expiresIn: '2h',
      },
    )

    res.json(user)
  } catch (error) {
    res.sendStatus(404)
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body

    if (!(email && password)) {
      res.status(404)
      return
    }

    const database: any = await initializeSqlite()
    const user = await database.get(`SELECT id, verified, password FROM users WHERE email = ?`, [email])

    if (!(user && (await compare(password, user.password)))) {
      res.sendStatus(404)
      return
    }

    user.token = sign(
      {
        user_id: user.id,
        email,
      },
      process.env.TOKEN_KEY as string,
      {
        expiresIn: '2h',
      },
    )

    res.json({
      email: user.email,
      token: user.token,
    })
  } catch (err) {
    res.sendStatus(404)
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const token = req.body.token || req.headers['x-access-token']
  if (!token) {
    res.sendStatus(404)
    return
  }
  try {
    res.locals.user = verify(token, process.env.TOKEN_KEY as string)
  } catch (err) {
    res.sendStatus(401)
    return
  }
  next()
}
