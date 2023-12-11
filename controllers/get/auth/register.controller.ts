import {Request, Response} from 'express'
import {hash} from 'bcrypt'
import {randomBytes} from 'crypto'
import {sign} from 'jsonwebtoken'
import {sqliteStorage} from 'services/storage/sqlite.storage'
import settingsConfig from 'configs/default.config'

export default async (req: Request, res: Response): Promise<void> => {
	try {
		const { first_name, last_name, email, password } = req.body

		if (!(email && password && first_name && last_name)) {
			res.status(404)
			res.json({
				error: {
					description: 'Please provide a valid email or password, refer to the API documentation'
				},
			})
			return
		}

		const database: any = sqliteStorage()
		const isUserCreated: boolean = !!(await database.get(
			`SELECT * FROM users WHERE email = ?`,
			[email.toLowerCase()]
		))

		if (isUserCreated) {
			res.status(404)
			res.json({
				error: {
					description: 'Please provide another username, refer to the API documentation'
				},
			})
			return
		}

		const encryptedPassword: string = await hash(password, 10)
		const verificationCode: string = randomBytes(8).toString('hex')
		const response = await database.run(
			`INSERT INTO users(first_name, last_name, email, password, verified, verification_code, address) VALUES (?, ?, ?, ?, ?, ?, ?)`,
			[
				first_name.toLowerCase(),
				last_name.toLowerCase(),
				email.toLowerCase(),
				encryptedPassword,
				1,
				verificationCode,
				req.ip
			]
		)
		const user: { token: string } = {
			token: ''
		}

		user.token = sign(
			{
				user_id: response.id,
				email
			},
			process.env.TOKEN_KEY as string,
			{
				expiresIn: settingsConfig.expireTime
			}
		)

		// sendMail(email, {
		//   title: 'Verify your account',
		//   body: `<h1>${first_name}, verify your Knury Knurów account! 🐷</h1><a href="http://192.168.0.73:3000/admin/verify?verification-code=${verificationCode}">[Click here]</a>`,
		// })

		res.json(user)
	} catch (error) {
		res.status(404)
		res.json(error)
	}
}
