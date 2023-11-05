import getPrisma from 'services/storage/prisma.storage'
import getCache from 'services/storage/cache.storage'
import responseFilter from 'services/storage/method/processData.method'
import {MatchFiltered, PlayerFiltered, ScheduleFiltered, TeamFiltered} from 'models/query/data.model'
import {LeagueFiltered} from 'models/query/league.model'

const set = (key: string, value: any): any => {
  if (!value) return []
  getCache().set(key, value)
  return value
}

const get = (key: string): any => {
  return getCache().get(key)
}

const getData = async <TypeSelected>(key: string, method?: string, value?: any): Promise<TypeSelected[]> => {
  const cachedData: TypeSelected[] = get(key)
  if (cachedData) return responseFilter[key](cachedData, method, value)
  const data: TypeSelected[] = method ? await getPrisma()[method](value) : await getPrisma()[key]()
  return responseFilter[key](set(key, data), method, value)
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
