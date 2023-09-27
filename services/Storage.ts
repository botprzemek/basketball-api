import query from './storage/ActiveSource'
import { MatchFiltered, MatchSelect, PlayerFiltered, PlayerSelect, TeamFiltered, TeamSelect } from 'models/Query.model'
import cache from 'services/storage/cache/Cache'
import responseFilter from 'utils/Filter.util'

const teams = async (): Promise<TeamFiltered[]> => {
  const cached: TeamFiltered[] = await cache.getData('teams')
  if (cached) return cached
  const data: TeamSelect[] = await query().teams()
  return cache.setData('teams', data)
}

const teamsByName = async (name: string): Promise<TeamFiltered[]> => {
  const cached: TeamFiltered[] = await cache.getData('teams')
  if (cached) return responseFilter.methods.teamByName(cached, name)
  cache.setData('teams', responseFilter.teamFilter(await query().teams()))
  return responseFilter.teamFilter(await query().teamsByName(name))
}

const players = async (): Promise<PlayerFiltered[]> => {
  const cached: PlayerFiltered[] = await cache.getData('players')
  if (cached) return cached
  const data: PlayerSelect[] = await query().players()
  return cache.setData('players', responseFilter.playerFilter(data))
}

const playersByName = async (name: string): Promise<PlayerFiltered[]> => {
  const cached: PlayerFiltered[] = await cache.getData('players')
  if (cached) return responseFilter.methods.playerByName(cached, name)
  cache.setData('players', responseFilter.playerFilter(await query().players()))
  return responseFilter.playerFilter(await query().playersByName(name))
}

const playersByTeam = async (name: string): Promise<PlayerFiltered[]> => {
  const cached: PlayerFiltered[] = await cache.getData('players')
  if (cached) return responseFilter.methods.playerByTeam(cached, name)
  cache.setData('players', responseFilter.playerFilter(await query().players()))
  return responseFilter.playerFilter(await query().playersByTeam(name))
}

const matches = async (): Promise<MatchFiltered[]> => {
  const cached: MatchFiltered[] = await cache.getData('matches')
  if (cached) return cached
  const data: MatchSelect[] = await query().matches()
  return cache.setData('matches', responseFilter.matchFilter(data))
}

const matchesByDate = async (date: string): Promise<MatchFiltered[]> => {
  const cached: MatchFiltered[] = await cache.getData('matches')
  if (cached) return responseFilter.methods.matchByDate(cached, date)
  cache.setData('matches', responseFilter.matchFilter(await query().matches()))
  return responseFilter.matchFilter(await query().matchesByDate(date))
}

// const playersByValue = async (key: string, value: string | number, limit: number) => {
//     if (!key || !value) return { data: null, error: null }
//
//     // TODO
//
//     const data = await query().playersByTeam('Knury Knurów')
//
//     if (data.error) return data
//
//     let filteredPlayers = data.data.filter((player: object) => { return player[key] === value })
//     filteredPlayers.filter((_: null, index: number) => { return index === limit })
//
//     if (filteredPlayers.length !== 0) data.data = (filteredPlayers.length === 1)
//         ? filteredPlayers.at(0)
//         : filteredPlayers
//     else data.error = {
//         code: 404,
//         message: `No players found matching value '${value}'`,
//         hint: null,
//         details: null,
//     }
//
//     return data
// }

export default {
  teams: () => teams(),
  teamsByName: (name: string) => teamsByName(name),
  players: () => players(),
  playersByName: (name: string) => playersByName(name),
  playersByTeam: (name: string) => playersByTeam(name),
  matches: () => matches(),
  matchesByDate: (date: string) => matchesByDate(date),
  schedules: () => {
    return null
  },
  // playersByValue: (key: string, value: string | number, limit: number) => playersByValue(key, value, limit),
}
