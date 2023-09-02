import supabase from './Initialize'

const queryMatches = async () => {
    return null
}

const queryPlayers = async () => {
    return supabase()
        .from('Player')
        .select('*')
        .order('id', { ascending: true })
}

export default {
    matches: () => queryMatches(),
    players: () => queryPlayers()
}