import {Request, Response} from 'express'
import {compare} from 'bcrypt'
import {sign} from 'jsonwebtoken'
import {sqliteStorage} from 'services/storage/sqlite.storage'
import defaultConfig from 'configs/default.config'

export default async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password } = req.body

		if (!email || !password) {
			res.status(404)
			res.json({
				error: {
					description:
						'Please provide a valid email or password, refer to the API documentation'
				}
			})
			return
		}

		const user = await sqliteStorage().get(
			`SELECT id, verified, password FROM users WHERE email = ?`,
			[email]
		)

		if (!(user && user.verified && (await compare(password, user.password)))) {
			res.status(404)
			res.json({
				error: {
					description:
						'Please provide a valid email or password, refer to the API documentation'
				}
			})
			return
		}

		const token: string = sign(
			{
				user_id: user.id,
				email
			},
			process.env.TOKEN_KEY as string,
			{
				expiresIn: defaultConfig.authTime
			}
		)

		console.log(`${new Date().toLocaleTimeString('pl-PL')} [auth] ${email} logged in`)

		res.status(200)
		res.json({
			token: token
		})
	} catch {
		res.status(404)
		res.json({
			error: {
				description:
					'There was an error with verifing the credentials, refer to the API documentation'
			}
		})
	}
}
