import supabase from './Initialize.js'
import cache from '../cache/Initialize.js';

const tables = [ 'players' ]
const cacheTime = 3600 * 1000

export const getPlayers = async () => {
    let request = cache().get(tables.at(0))
    if (request) return request

    request = await supabase()
        .from(tables.at(0))
        .select('*')
        .order('lastname', { ascending: true })
    cache().set(tables.at(0), request, cacheTime)
    return request
}

export const getPlayersByValue = async (key, value, limit) => {
    if (!key || !value) return { data: null, error: null }

    let request = cache().get(tables.at(0))

    if (!request) {
        request = await supabase()
            .from(tables.at(0))
            .select('*')
            .order('lastname', { ascending: true })
        cache().set(tables.at(0), request, cacheTime)
    }

    if (request.error) return request

    let filteredPlayers = request.data.filter(player => {
        if (typeof player[key] === 'number') return player[key] === parseInt(value)
        return player[key] === value
    })

    filteredPlayers.filter((player, index) => { return index === limit })

    if (filteredPlayers.length !== 0) request.data = (filteredPlayers.length === 1)
        ? filteredPlayers.at(0)
        : filteredPlayers
    else request.error = {
        code: 404,
        message: `No players found matching value '${value}'`,
        hint: null,
        details: null,
    }

    return request
}