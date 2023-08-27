import * as stream from 'stream'
import {Router} from 'express'
import supabase from '../../../storage/supabase/Initialize'

const router = Router()

router.get('/:file/:extension', async (req, res) => {
    const readStream = new stream.PassThrough()
    const fileName = `${req.params.file}.${req.params.extension}`
    const { data, error } = await supabase()
        .storage
        .from('files')
        .download(fileName)

    if (!data || error) return res.sendStatus(404)

    const buffer = Buffer.from(await data.arrayBuffer(), 'base64')
    readStream.end(buffer)

    res.set('Content-disposition', `attachment; filename=${fileName}`)
    res.set('Content-Type', 'text/plain')
    readStream.pipe(res)
})

export default router