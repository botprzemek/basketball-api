import prisma from './initialize.prisma'
import { type MatchSelected, type PlayerSelected, type ScheduleSelected, type TeamSelected } from 'models/data.model'
import config from 'config'
import playerQuery from './query/player.query'
import playerByNameQuery from './query/playerByName.query'
import teamsQuery from './query/team.query'
import teamsByNameQuery from './query/team.query'
import matchByDateQuery from './query/matchByDate.query'
import matchQuery from './query/match.query'
import scheduleQuery from 'services/storage/prisma/query/schedule.query'
import scheduleByDateQuery from 'services/storage/prisma/query/scheduleByDate.query'
import scheduleBeforeDateQuery from 'services/storage/prisma/query/scheduleBeforeDate.query'
import scheduleAfterDateQuery from 'services/storage/prisma/query/scheduleAfterDate.query'
import leagueQuery from 'services/storage/prisma/query/league.query'
import { type LeagueSelected } from 'models/query/league.model'

const cacheStrategy: { swr: number; ttl: number } = {
  swr: config.cacheTime * 2,
  ttl: config.cacheTime,
}

const query = async <TypeQueried>(prismaKey: string, queryKey: string, values?: any[]): Promise<TypeQueried[]> => {
  try {
    const query = queryList[queryKey](values)
    return (await prisma())[prismaKey].findMany({
      cacheStrategy,
      where: query.where,
      select: query.select,
    })
  } catch (error) {
    return []
  }
}

const queryList = {
  players: (values: any[]) => playerQuery(values),
  playersByName: (values: any[]) => playerByNameQuery(values),
  teams: (values: any[]) => teamsQuery(values),
  teamsByName: (values: any[]) => teamsByNameQuery(values),
  matches: (values: any[]) => matchQuery(values),
  matchesByDate: (values: any[]) => matchByDateQuery(values),
  schedules: (values: any[]) => scheduleQuery(values),
  schedulesByDate: (values: any[]) => scheduleByDateQuery(values),
  schedulesAfterDate: (values: any[]) => scheduleAfterDateQuery(values),
  schedulesBeforeDate: (values: any[]) => scheduleBeforeDateQuery(values),
  leagues: (values: any[]) => leagueQuery(values),
}

export default {
  players: async (): Promise<PlayerSelected[]> => query('player', 'players'),
  playersByName: async (name: string): Promise<PlayerSelected[]> => query('player', 'playersByName', [name]),
  teams: async (): Promise<TeamSelected[]> => query('team', 'teams'),
  teamsByName: async (name: string): Promise<TeamSelected[]> => query('team', 'teamsByName', [name]),
  matches: async (): Promise<MatchSelected[]> => query('match', 'matches'),
  matchesByDate: async (date: string): Promise<MatchSelected[]> => {
    const yesterday: Date = new Date(date)
    const tomorrow: Date = new Date(date)
    yesterday.setDate(yesterday.getDate())
    tomorrow.setDate(tomorrow.getDate() + 1)
    return query('match', 'matchesByDate', [yesterday, tomorrow])
  },
  schedules: async (): Promise<ScheduleSelected[]> => await query('schedule', 'schedules'),
  schedulesByDate: async (date: string): Promise<ScheduleSelected[]> => {
    const yesterday: Date = new Date(date)
    const tomorrow: Date = new Date(date)
    yesterday.setDate(yesterday.getDate())
    tomorrow.setDate(tomorrow.getDate() + 1)
    return query('schedule', 'schedulesByDate', [yesterday, tomorrow])
  },
  schedulesAfterDate: async (date: string): Promise<ScheduleSelected[]> => {
    const day: Date = new Date(date)
    day.setDate(day.getDate() + 1)
    return query('schedule', 'schedulesAfterDate', [day])
  },
  schedulesBeforeDate: async (date: string): Promise<ScheduleSelected[]> => {
    const day: Date = new Date(date)
    day.setDate(day.getDate())
    return query('schedule', 'schedulesBeforeDate', [day])
  },
  leagues: async (): Promise<LeagueSelected[]> => query('league', 'leagues'),
}
