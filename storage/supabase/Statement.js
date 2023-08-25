import supabase from './Initialize.js'

export const queryPlayers = async () => {
    return supabase()
        .from('players')
        .select('*')
        .order('id', { ascending: true })
}

export const getDataEqual = async (identifier, select, equalKey, equalValue, order) => {
    return supabase()
        .from(identifier)
        .select(select)
        .eq(equalKey, equalValue)
        .order(order, { ascending: true })
}