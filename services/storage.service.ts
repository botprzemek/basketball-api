import query from './storage/active.storage'
import { type MatchFiltered, type PlayerFiltered, type ScheduleFiltered, type TeamFiltered } from 'models/data.model'
import cache from 'services/cache.service'
import responseFilter from 'utils/storage/process.storage'
import { type LeagueFiltered } from 'models/query/league.model'

const getData = async <TypeSelected>(key: string, method?: string, value?: any): Promise<TypeSelected[]> => {
  const cachedData: TypeSelected[] = await cache.getData(key)
  if (cachedData) return responseFilter[key](cachedData, method, value)
  const data: TypeSelected[] = method ? await query()[method](value) : await query()[key]()
  return responseFilter[key](cache.setData(key, data), method, value)
}

export default {
  players: async (): Promise<PlayerFiltered[]> => await getData('players'),
  playersByName: async (name: string): Promise<PlayerFiltered[]> => await getData('players', 'playersByName', name),
  playersByTeam: async (team: string): Promise<PlayerFiltered[]> => {
    const data: TeamFiltered[] = await getData('teams', 'teamsByName', team)
    return data.flatMap((team: TeamFiltered) => team.players)
  },
  teams: async (): Promise<TeamFiltered[]> => await getData('teams'),
  teamsByName: async (name: string): Promise<TeamFiltered[]> => await getData('teams', 'teamsByName', name),
  matches: async (): Promise<MatchFiltered[]> => await getData('matches'),
  matchesByDate: async (date: string): Promise<MatchFiltered[]> => await getData('matches', 'matchesByDate', date),
  schedules: async (): Promise<ScheduleFiltered[]> => await getData('schedules'),
  schedulesByDate: async (date: string): Promise<ScheduleFiltered[]> => await getData('schedules', 'schedulesByDate', date),
  schedulesAfterDate: async (date: string): Promise<ScheduleFiltered[]> => await getData('schedules', 'schedulesAfterDate', date),
  schedulesBeforeDate: async (date: string): Promise<ScheduleFiltered[]> => await getData('schedules', 'schedulesBeforeDate', date),
  leagues: async (): Promise<LeagueFiltered[]> => await getData('leagues'),
}
