import supabase from './Initialize.js'

const queryPlayers = async () => {
    return supabase()
        .from('players')
        .select('*')
        .order('id', { ascending: true })
}

const queryPlayersBy = async (key, value) => {
    return supabase()
        .from('players')
        .select('*')
        .eq(key, value)
}

const getDataEqual = async (identifier, select, equalKey, equalValue, order) => {
    return supabase()
        .from(identifier)
        .select(select)
        .eq(equalKey, equalValue)
        .order(order, { ascending: true })
}

export default {
    players: () => queryPlayers(),
    playersBy: (key, value) => queryPlayersBy(key, value)
}