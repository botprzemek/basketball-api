import { NextFunction, Request, Response } from 'express'
import initializeSqlite from 'services/storage/sqlite/initialize.sqlite'
import { compare, hash } from 'bcrypt'
import { sign, verify as verifyToken } from 'jsonwebtoken'
import sendMail from 'services/mail/send.mail'
import { randomBytes } from 'crypto'
import defaultConfig from 'config'

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { first_name, last_name, email, password } = req.body

    if (!(email && password && first_name && last_name)) {
      res.sendStatus(404)
      return
    }

    const database: any = await initializeSqlite()
    const isUserCreated: boolean = !!(await database.get(`SELECT * FROM users WHERE email = ?`, [email.toLowerCase()]))

    if (isUserCreated) {
      res.sendStatus(404)
      return
    }

    const encryptedPassword: string = await hash(password, 10)
    const verificationCode: string = randomBytes(8).toString('hex')
    const user = {
      email: email,
      token: '',
    }
    const response = await database.run(
      `INSERT INTO users(first_name, last_name, email, password, verified, verification_code, address) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [first_name.toLowerCase(), last_name.toLowerCase(), email.toLowerCase(), encryptedPassword, 0, verificationCode, req.ip],
    )

    user.token = sign(
      {
        user_id: response.id,
        email,
      },
      process.env.TOKEN_KEY as string,
      {
        expiresIn: '2h',
      },
    )

    sendMail(email, {
      title: 'Verify your account',
      body: `<h1>${first_name}, verify your Knury Knurów account! 🐷</h1><a href="http://192.168.0.73:3000/admin/verify?verification-code=${verificationCode}">[Click here]</a>`,
    })

    res.json(user)
  } catch (error) {
    res.sendStatus(404)
  }
}

export async function verify(req: Request, res: Response): Promise<void> {
  try {
    const code: string = <string>req.query['verification-code']

    if (!code) {
      res.sendStatus(404)
      return
    }

    const database: any = await initializeSqlite()
    const { id, verification_code } = await database.get(`SELECT id, verification_code FROM users WHERE verification_code = ? AND verified = ?`, [
      code,
      0,
    ])

    if (!verification_code) {
      res.sendStatus(404)
      return
    }

    await database.get(`UPDATE users SET verified = ? WHERE id = ?`, [1, id])

    res.sendStatus(200)
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

    if (!(user && user.verified && (await compare(password, user.password)))) {
      res.sendStatus(404)
      return
    }

    const token: string = sign(
      {
        user_id: user.id,
        email,
      },
      process.env.TOKEN_KEY as string,
      {
        expiresIn: defaultConfig.expireTime,
      },
    )

    console.log(`${new Date().toLocaleTimeString('pl-PL')} [auth] user logged in (${email})`)

    res.json({
      email: email,
      token: token,
    })
  } catch (error) {
    res.sendStatus(401)
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  try {
    const token = req.headers['x-access-token']

    if (!token || Array.isArray(token)) {
      res.sendStatus(404)
      return
    }

    res.locals.user = verifyToken(token, process.env.TOKEN_KEY as string)
    next()
  } catch (error) {
    res.sendStatus(401)
  }
}
