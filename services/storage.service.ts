import query from './storage/active.storage'
import { type MatchFiltered, type PlayerFiltered, type TeamFiltered } from 'models/query.model'
import cache from 'services/cache.service'
import responseFilter from 'utils/process.util'

const getData = async <TypeSelected>(key: string, method?: string, value?: any): Promise<TypeSelected[]> => {
  const cachedData: TypeSelected[] = await cache.getData(key)
  if (cachedData) return responseFilter[key](cachedData, method, value)
  const data: TypeSelected[] = await query()[key]()
  return responseFilter[key](cache.setData(key, data), method, value)
}

export default {
  players: async (): Promise<PlayerFiltered[]> => await getData('players'),
  playersByName: async (name: string): Promise<PlayerFiltered[]> => await getData('players', 'playersByName', name),
  playersByTeam: async (name: string): Promise<PlayerFiltered[]> => await getData('teams', 'playersByTeam', name),
  teams: async (): Promise<TeamFiltered[]> => await getData('teams'),
  teamsByName: async (name: string): Promise<TeamFiltered[]> => await getData('teams', 'teamsByName', name),
  matches: async (): Promise<MatchFiltered[]> => await getData('matches'),
  matchesByDate: async (name: string): Promise<MatchFiltered[]> => await getData('matches', 'matchesByDate', name),
}
