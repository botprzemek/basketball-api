import express from 'express'
import {getPlayersByValue} from '../../../storage/supabase/Statement.js'
import {Player} from '../../../model/Player.js'

const router = express.Router()

router.get('/by/:key/:value/:limit?', async (req, res) => {
    const limit = (req.params.limit) ? parseInt(req.params.limit) : 999
    let { data: players, error } = await getPlayersByValue(req.params.key, req.params.value, limit)

    if (!players || players.length === 0 || error) {
        console.log((error)
            ? `[supabase] ${error.code} error occurred (${error.message})`
            : '[supabase] requested players are null')
        return res.sendStatus(404)
    }

    if (!Array.isArray(players)) {
        res.send(new Player(players))
        return console.log(`[${req.ip}] GET ${req.baseUrl + req.path} - requested player ${players.name} ${players.lastname} with ${((performance.now() - res.locals.start) / 1000).toFixed(2)}s`)
    }

    res.send(players.map(player => new Player(player)))
    console.log(`[${req.ip}] GET ${req.baseUrl + req.path} - requested ${players.length} players with ${((performance.now() - res.locals.start) / 1000).toFixed(2)}s`)
})

export default router