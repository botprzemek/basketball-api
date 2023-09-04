import * as stream from 'stream'
import {Router} from 'express'

const router = Router()

router.get('/:file/:extension', async (req, res) => {
    const readStream: stream.PassThrough = new stream.PassThrough()
    const fileName: string = `${req.params.file}.${req.params.extension}`
    const { data, error } = { data: null, error: null } //await supabase()
        // .storage
        // .from('files')
        // .download(fileName)

    if (!data || error) return res.sendStatus(404)

    const buffer: Buffer = Buffer.from(await data.arrayBuffer(), 'base64')
    readStream.end(buffer)

    res.set('Content-disposition', `attachment; filename=${fileName}`)
    res.set('Content-Type', 'text/plain')
    readStream.pipe(res)
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [request] GET ${req.baseUrl + req.path} - requested ${fileName}`)
})

export default router