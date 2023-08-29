import {Router} from 'express'
import {Player,PlayerType} from '../../../../model/Player'
import {storage} from '../../../../storage/Storage'

const router = Router()

router.get('/by/:key/:value/:limit?', async (req, res) => {
    const limit = (req.params.limit) ? parseInt(req.params.limit) : 999
    let { data: players, error } = await storage().playersBy(req.params.key, req.params.value, limit)

    if (!players || players.length === 0 || error) {
        console.log((error)
            ? `${new Date().toLocaleTimeString('pl-PL')} [storage] ${error.code} error occurred (${error.message})`
            : '${new Date().toLocaleTimeString(\'pl-PL\')} [storage] requested players are null')
        return res.sendStatus(400)
    }

    if (!Array.isArray(players)) {
        res.send(new Player(players))
        return console.log(`${new Date().toLocaleTimeString('pl-PL')} [request] GET ${req.baseUrl + req.path} - requested player ${players.name} ${players.lastname} (${((performance.now() - res.locals.start) / 1000).toFixed(2)}s)`)
    }

    res.send(players.map((player: PlayerType) => new Player(player)))
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [request] GET ${req.baseUrl + req.path} - requested ${players.length} players (${((performance.now() - res.locals.start) / 1000).toFixed(2)}s)`)
})

export default router