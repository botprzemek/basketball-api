import query from './storage/ActiveSource'
import { MatchFiltered, MatchSelect, TeamFiltered, TeamSelect } from 'models/Query.model'
import cache from 'services/storage/cache/Cache'
import responseFilter from '../utils/Filter'

const teams = async (): Promise<TeamFiltered[]> => {
  const cached: TeamFiltered[] = await cache.getData('teams')
  if (cached) return cached
  const data: TeamSelect[] = await query().teams()
  return cache.setData('teams', responseFilter.teamFilter(data))
}

const teamsByName = async (name: string): Promise<TeamFiltered[]> => {
  const cached: TeamFiltered[] = await cache.getData('teams')
  if (cached) return responseFilter.methods.teamByName(cached, name)
  cache.setData('teams', responseFilter.teamFilter(await query().teams()))
  return responseFilter.teamFilter([await query().teamsByName(name)])
}

const players = async (): Promise<any> => {
  return await query().players()
  // const data = await cache.getData('players')
  // if (data) return data
  // return cache.setData('players', await query().players())
}

const playersByTeam = async (name: string): Promise<any> => {
  return await query().playersByTeam(name)
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
  playersByTeam: (name: string) => playersByTeam(name),
  matches: () => matches(),
  matchesByDate: (date: string) => matchesByDate(date),
  schedules: () => {
    return null
  },
  // playersByValue: (key: string, value: string | number, limit: number) => playersByValue(key, value, limit),
}
