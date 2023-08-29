import cache from './cache/Initialize'
import query from './Statement'


const getPlayers = async () => {
    let data = cache().get('players')

    if (data) return data

    data = await query().players()
    cache().set('players', data, 30000)
    return data
}

const getPlayersBy = async (key: string, value: string | number, limit: number) => {
    if (!key || !value) return { data: null, error: null }

    let data = cache().get('players')

    if (!data) {
        data = await query().playersBy(key, value)
        cache().set('players', data, 30000)
    }

    if (data.error) return data

    let filteredPlayers = data.data.filter((player: object) => {
        return player[key] === value
    })

    filteredPlayers.filter((_: null, index: number) => { return index === limit })

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

export async function setupStorage() {
    const data = await query().players()
    if (!data) return console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] an error occurred while connecting to database`)
    cache().set('players', data, 30000)
}

export const storage = () => {
    return {
        players: () => getPlayers(),
        playersBy: (key: string, value: string | number, limit: number) => getPlayersBy(key, value, limit)
    }
}