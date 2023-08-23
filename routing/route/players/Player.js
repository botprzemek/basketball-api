import supabase from '../../../storage/supabase/Initialize.js'
import express from 'express'
import {Player} from '../../../models/Player.js'

const router = express.Router()

router.get('/:id', async (req, res) => {
    let { data: player, error } = await supabase()
        .from('players')
        .select('name, lastname, number, height, position')
        .eq('id', req.params.id)
    player = player[0]

    if (!player || error) return res.sendStatus(404)

    res.send(new Player(player))
    console.log(`[supabase] requested player (${player.name} ${player.lastname}) with ${((performance.now() - res.locals.start) / 1000).toFixed(2)}s`)
})

export default router