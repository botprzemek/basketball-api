import {Request, Response} from 'express'
import {sqliteStorage} from 'services/storage/sqlite.storage'

export default async (req: Request, res: Response): Promise<void> => {
	try {
		const code: string = <string>req.query['verification-code']

		if (!code) {
			res.status(404)
			res.json({
				error: {
					description: 'Please provide a valid verification code, refer to the API documentation'
				},
			})
			return
		}

		const database: any = sqliteStorage()
		const { id, verification_code } = await database.get(
			`SELECT id, verification_code FROM users WHERE verification_code = ? AND verified = ?`,
			[code, 0]
		)

		if (!verification_code) {
			res.status(404)
			res.json({
				error: {
					description: 'Please provide a valid verification code, refer to the API documentation'
				},
			})
			return
		}

		await database.get(`UPDATE users SET verified = ? WHERE id = ?`, [1, id])

		res.sendStatus(200)
	} catch (error) {
		res.status(404)
		res.json(error)
	}
}
