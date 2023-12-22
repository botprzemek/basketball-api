import { type Response } from 'express'
import { gzipSync } from 'zlib'
import { compress } from 'brotli-compress'
import defaultConfig from 'configs/default.config'

const compressionType = {
	gzip: (data: string): Uint8Array => gzipSync(data),
	br: async (data: string): Promise<Uint8Array> => await compress(Buffer.from(data))
}

export default async (res: Response, data: any): Promise<void> => {
	const parsedData: string = JSON.stringify(data)
	const buffer: Uint8Array = await compressionType[defaultConfig.useCompression](parsedData)

	res.set('Content-Encoding', defaultConfig.useCompression)
	res.set('Content-Length', buffer.length.toString())

	res.write(buffer)
	res.end()
}
