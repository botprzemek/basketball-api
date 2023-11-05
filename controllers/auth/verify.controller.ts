import { Request, Response } from 'express'
import { sqliteStorage } from 'services/storage/sqlite.storage'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const code: string = <string>req.query['verification-code']

    if (!code) {
      res.sendStatus(404)
      return
    }

    const database: any = sqliteStorage()
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
