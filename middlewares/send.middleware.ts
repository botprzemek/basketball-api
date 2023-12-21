import { type Request, type Response } from 'express'
import * as zlib from 'zlib'

export default function (req: Request, res: Response): void {
	const data: any[] = res.locals.data

	if (!data || !Array.isArray(data) || data.length === 0) {
		res.sendStatus(204)
		return
	}

	const compressedBuffer: Buffer = zlib.gzipSync(JSON.stringify(data))

	res.set('Content-Encoding', 'gzip')
	res.set('Content-Length', compressedBuffer.length.toString())
	res.write(compressedBuffer)

	res.end()

	console.log(
		`${new Date().toLocaleTimeString('pl-PL')} [request] ${req.method} ${decodeURI(
			req.baseUrl + req.path
		)} (${((performance.now() - res.locals.start) / 1000).toFixed(2)}s)`
	)
}
