import supabase from './Initialize'

const queryPlayers = async () => {
    return supabase()
        .from('Player')
        .select('*')
        .order('id', { ascending: true })
}

const queryPlayersBy = async (key, value) => {
    return supabase()
        .from('Player')
        .select('*')
        .eq(key, value)
}

export default {
    players: () => queryPlayers(),
    playersBy: (key, value) => queryPlayersBy(key, value)
}