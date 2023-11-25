import { Request, Response } from 'express'
import { verify, VerifyErrors } from 'jsonwebtoken'

export default (req: Request, res: Response): void => {
	const token = req.headers['x-access-token']

	if (!token || Array.isArray(token)) {
		res.sendStatus(404)
		return
	}

	verify(
		token,
		process.env.TOKEN_KEY as string,
		(error: VerifyErrors, verifiedToken: { exp: number }): void => {
			if (error) {
				res.sendStatus(401)
				return
			}

			if (!verifiedToken || typeof verifiedToken !== 'object') {
				res.sendStatus(401)
				return
			}

			if (verifiedToken?.exp && Date.now() >= verifiedToken?.exp * 1000) {
				res.sendStatus(401)
				return
			}

			res.sendStatus(200)
		}
	)
}
