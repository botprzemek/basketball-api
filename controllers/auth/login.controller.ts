import { Request, Response } from 'express'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { sqliteStorage } from 'services/storage/sqlite.storage'
import settingsConfig from 'configs/default.config'

export default async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password } = req.body

		if (!(email && password)) {
			res.status(404)
			return
		}

		const user = await sqliteStorage().get(
			`SELECT id, verified, password FROM users WHERE email = ?`,
			[email]
		)

		if (!(user && user.verified && (await compare(password, user.password)))) {
			res.sendStatus(404)
			return
		}

		const token: string = sign(
			{
				user_id: user.id,
				email
			},
			process.env.TOKEN_KEY as string,
			{
				expiresIn: settingsConfig.expireTime
			}
		)

		console.log(`${new Date().toLocaleTimeString('pl-PL')} [auth] ${email} logged in`)

		res.json({
			token: token
		})
	} catch (error) {
		res.sendStatus(401)
	}
}
