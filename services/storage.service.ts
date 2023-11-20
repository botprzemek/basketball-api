import * as cacheStorage from 'services/storage/cache.storage'
import queries from 'services/storage/query.storage'

const getData = async <TypeSelected>(key: string, method?: string, parameters?: any[]): Promise<TypeSelected[]> => {
  try {
    const cacheKey: string = method && parameters ? `${key}.${method}.${parameters.toString()}` : key
    const cachedData: TypeSelected[] = cacheStorage.getData(cacheKey)

    if (cachedData) return cachedData

    const queryData = method && parameters ? await queries[method](parameters) : await queries[key]()

    return cacheStorage.setData(cacheKey, queryData)
  }
  catch {
    return []
  }
}

export default {
  players: async (): Promise<any[]> => await getData('players'),
  playersById: async (id: bigint): Promise<any[]> => await getData('players', 'playersById', [id]),
  playersByName: async (name: string): Promise<any[]> => await getData('players', 'playersByName', [name]),
  playersByTeamId: async (id: bigint): Promise<any[]> => await getData('players', 'playersByTeamId', [id]),
  playersByTeamName: async (name: string): Promise<any[]> => await getData('players', 'playersByTeamName', [name]),

  staff: async (): Promise<any[]> => await getData('staff'),
  staffByTeamId: async (id: bigint): Promise<any[]> => await getData('staff', 'staffByTeamId', [id]),
  staffByTeamName: async (name: string): Promise<any[]> => await getData('staff', 'staffByTeamName', [name]),

  teams: async (): Promise<any[]> => await getData('teams'),
  teamsById: async (id: bigint): Promise<any[]> => await getData('teams', 'teamsById', [id]),
  teamsByName: async (name: string): Promise<any[]> => await getData('teams', 'teamsByName', [name]),

  leagues: async (): Promise<any[]> => await getData('leagues'),

  matches: async (): Promise<any[]> => await getData('matches'),
  matchesByDate: async (date: string): Promise<any[]> => await getData('matches', 'matchesByDate', [date]),

  schedules: async (): Promise<any[]> => await getData('schedules'),
  schedulesByClosest: async (): Promise<any[]> => await getData('schedules'),
  schedulesByDate: async (date: string): Promise<any[]> => await getData('schedules', 'schedulesByDate', [date]),
  schedulesAfterDate: async (date: string): Promise<any[]> => await getData('schedules', 'schedulesAfterDate', [date]),
  schedulesBeforeDate: async (date: string): Promise<any[]> => await getData('schedules', 'schedulesBeforeDate', [date]),
}
