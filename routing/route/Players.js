import supabase from "../../storage/supabase/Initialize.js";

router.get('/', async (req, res) => {
    let { data: players, error } = await supabase()
        .from('players')
        .select()
    if (!players) return res.sendStatus(404)
    res.send(players)
})