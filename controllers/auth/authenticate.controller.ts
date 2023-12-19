import { Request, Response } from 'express'
import { verify, VerifyErrors } from 'jsonwebtoken'

export default (req: Request, res: Response): void => {
	let token = req.headers['Authorization']

	if (!token || Array.isArray(token)) {
		res.status(401)
		res.json({
			error: {
				description:
					'Please provide a valid authorization token, refer to the API documentation'
			}
		})
		return
	}

	token = token.split(' ').at(1)

	if (!token) {
		res.status(401)
		res.json({
			error: {
				description:
					'Please provide a valid authorization token, refer to the API documentation'
			}
		})
		return
	}

	verify(
		token,
		process.env.TOKEN_KEY as string,
		(error: VerifyErrors, verifiedToken: { exp: number }): void => {
			if (error) {
				res.status(401)
				res.json({
					error: {
						description:
							'Please provide a valid authorization token, refer to the API documentation'
					}
				})
				return
			}

			if (!verifiedToken || typeof verifiedToken !== 'object') {
				res.status(401)
				res.json({
					error: {
						description:
							'Please provide a valid authorization token, refer to the API documentation'
					}
				})
				return
			}

			if (verifiedToken?.exp && Date.now() >= verifiedToken?.exp * 1000) {
				res.status(401)
				res.json({
					error: {
						description:
							'Please provide a valid authorization token, refer to the API documentation'
					}
				})
				return
			}

			res.sendStatus(200)
		}
	)
}
