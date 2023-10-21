import { Request, Response } from 'express'
import initializeSqlite from 'services/storage/sqlite/initialize.sqlite'
import { hash } from 'bcrypt'
import { randomBytes } from 'crypto'
import { sign } from 'jsonwebtoken'
import defaultConfig from 'config'
import sendMail from 'services/mail/send.mail'

export default async (req: Request, res: Response): Promise<void> => {
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
    const response = await database.run(
      `INSERT INTO users(first_name, last_name, email, password, verified, verification_code, address) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [first_name.toLowerCase(), last_name.toLowerCase(), email.toLowerCase(), encryptedPassword, 1, verificationCode, req.ip],
    )
    const user: { token: string } = {
      token: '',
    }

    user.token = sign(
      {
        user_id: response.id,
        email,
      },
      process.env.TOKEN_KEY as string,
      {
        expiresIn: defaultConfig.expireTime,
      },
    )

    // sendMail(email, {
    //   title: 'Verify your account',
    //   body: `<h1>${first_name}, verify your Knury Knurów account! 🐷</h1><a href="http://192.168.0.73:3000/admin/verify?verification-code=${verificationCode}">[Click here]</a>`,
    // })

    res.json(user)
  } catch (error) {
    res.sendStatus(404)
  }
}
