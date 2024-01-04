import { Request, Response } from 'express'
import { verify, VerifyErrors } from 'jsonwebtoken'

const verifyCallback = (res: Response, error: VerifyErrors | null, verifiedToken: any): void => {
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

export default (req: Request, res: Response): void => {
	let token: string | undefined = req.headers['authorization']

	if (!token || Array.isArray(token)) {
		res.sendStatus(401)
		return
	}

	token = token.split(' ').at(1)

	if (!token) {
		res.sendStatus(401)
		return
	}

	verify(token, process.env.TOKEN_KEY as string, (error, decoded) =>
		verifyCallback(res, error, decoded)
	)
}
