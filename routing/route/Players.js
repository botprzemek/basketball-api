import supabase from '../../storage/supabase/Initialize.js'
import express from 'express'
import player from './players/Player.js'
import {Player} from '../../models/Player.js'

const router = express.Router()

router.get('', async (req, res) => {
    const { data: players, error } = await supabase()
        .from('players')
        .select('name, lastname, number, height, position')
        .order('lastname', { ascending: true })

    if (!players || error) return res.sendStatus(404)

    res.send(players.map(player => new Player(player)))
    console.log(`[supabase] requested players with ${((performance.now() - res.locals.start) / 1000).toFixed(2)}s`)
})

router.use('/player', player)

export default router