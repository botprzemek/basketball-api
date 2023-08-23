import supabase from '../../storage/supabase/Initialize.js'
import express from 'express'

const router = express.Router();

router.get('/players', async (req, res) => {
    let { data: players, error } = await supabase()
        .from('players')
        .select()
    if (!players || error) return res.sendStatus(404)
    res.send(players)
})

export default router