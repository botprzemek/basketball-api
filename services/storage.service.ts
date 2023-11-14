import getPrisma from 'services/storage/prisma.storage'
import getCache from 'services/storage/cache.storage'
import responseFilter from 'services/storage/method/processData.method'
import { MatchFiltered, PlayerFiltered, ScheduleFiltered, TeamFiltered } from 'models/query/data.model'
import { LeagueFiltered } from 'models/query/league.model'
import { schedulesAfterDate, schedulesBeforeDate } from 'controllers/api/schedule.controller'
import { leagues } from 'controllers/api/league.controller'

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
  schedulesByClosest: (): any => {
    return {
      teams: [
        {
          name: 'Golden State Warriors',
          players: [
            { name: 'Stephen', lastname: 'Curry', number: 30, position: 'PG', starter: true },
            { name: 'Klay', lastname: 'Thompson', number: 11, position: 'SG', starter: true },
            { name: 'Andrew', lastname: 'Wiggins', number: 22, position: 'SF', starter: true },
            { name: 'Draymond', lastname: 'Green', number: 23, position: 'PF', starter: true },
            { name: 'Kevon', lastname: 'Looney', number: 5, position: 'C', starter: true },
            { name: 'Chris', lastname: 'Paul', number: 3, position: 'SG' },
            { name: 'Moses', lastname: 'Moody', number: 4, position: 'SG' },
            { name: 'Jonathan', lastname: 'Kuminga', number: 0, position: 'PF' },
          ],
        },
        {
          name: 'Los Angeles Lakers',
          players: [
            { name: `D'Angelo`, lastname: 'Russell', number: 1, position: 'PG', starter: true },
            { name: 'Austin', lastname: 'Reaves', number: 15, position: 'SG', starter: true },
            { name: 'LeBron', lastname: 'James', number: 23, position: 'SF', starter: true },
            { name: 'Jarred', lastname: 'Vanderbilt', number: 2, position: 'PF', starter: true },
            { name: 'Anthony', lastname: 'Davis', number: 3, position: 'C', starter: true },
            { name: 'Rui', lastname: 'Hachimura', number: 28, position: 'PF' },
          ],
          starting: [1, 15, 23, 2, 3],
        },
      ],
    }
  },
  schedulesByDate: async (date: string): Promise<ScheduleFiltered[]> => await getData('schedules', 'schedulesByDate', date),
  schedulesAfterDate: async (date: string): Promise<ScheduleFiltered[]> => await getData('schedules', 'schedulesAfterDate', date),
  schedulesBeforeDate: async (date: string): Promise<ScheduleFiltered[]> => await getData('schedules', 'schedulesBeforeDate', date),
  leagues: async (): Promise<LeagueFiltered[]> => await getData('leagues'),
}
