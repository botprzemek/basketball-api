import cache from './cache/Initialize.js'
import supabase from './supabase/Initialize.js'
import {queryPlayers} from './supabase/Statement.js'

supabase()

const getPlayers = async () => {
    let data = cache().get('players')
    if (data) return data

    data = await queryPlayers()
    cache().set('players', data, 3600000)
    return data
}

getPlayers()

const getPlayersBy = async (key, value, limit) => {
    if (!key || !value) return { data: null, error: null }

    let data = cache().get('players')

    if (!data) {
        data = await queryPlayers()
        cache().set('players', data, 3600000)
    }

    if (data.error) return data

    let filteredPlayers = data.data.filter(player => {
        if (typeof player[key] === 'number') return player[key] === parseInt(value)
        return player[key] === value
    })

    filteredPlayers.filter((player, index) => { return index === limit })

    if (filteredPlayers.length !== 0) data.data = (filteredPlayers.length === 1)
        ? filteredPlayers.at(0)
        : filteredPlayers
    else data.error = {
        code: 404,
        message: `No players found matching value '${value}'`,
        hint: null,
        details: null,
    }

    return data
}

export default function () {
    return {
        players: () => getPlayers(),
        playersBy: (key, value, limit) => getPlayersBy(key, value, limit)
    }
}