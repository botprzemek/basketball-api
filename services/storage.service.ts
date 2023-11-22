import getMethod from 'services/storage/method/get.method'
import processMethod from 'services/storage/method/process.method'
import {playersStatistics} from "controllers/api/playerStatistics.controller";

const applyMethods = async (key: string, method?: string, parameters?: any[]): Promise<any[]> => {
  const data: any[] = await getMethod(key, method, parameters)
  return processMethod(key, data, method, parameters)
}

const addPlayers = async (data: any[], sort?: string): Promise<any[]> => {
  if (data.length === 0) return []

  for (let i: number = 0; i < data.length; i++) {
    data[i].player = await applyMethods('players', 'playersById', [data[i].player_id])
  }

  if (sort) data.sort((a: any, b: any) => b[sort] - a[sort])

  return data
}

export default {
  players: async (): Promise<any[]> => await applyMethods('players'),
  playersById: async (id: bigint): Promise<any[]> => await applyMethods('players', 'playersById', [id]),
  playersByName: async (name: string): Promise<any[]> => await applyMethods('players', 'playersByName', [name]),
  playersByTeamId: async (id: bigint): Promise<any[]> => await applyMethods('players', 'playersByTeamId', [id]),

  playersStatistics: async (): Promise<any[]> => {
    const playersStatistics: any[] = await applyMethods('playersStatistics')

    return addPlayers(playersStatistics)
  },
  playersStatisticsById: async (id: bigint): Promise<any[]> => await applyMethods('playersStatistics', 'playersStatisticsById', [id]),
  playersStatisticsByTeamId: async (id: bigint): Promise<any[]> => await applyMethods('playersStatistics', 'playersStatisticsByTeamId', [id]),
  playersStatisticsAvg: async (): Promise<any[]> => {
    const playersStatistics: any[] = await applyMethods('playersStatisticsAvg', 'playersStatisticsAvg', [])

    return addPlayers(playersStatistics)
  },
  playersStatisticsAvgPoints: async (): Promise<any[]> => {
    const playersStatistics: any[] = await applyMethods('playersStatisticsAvg', 'playersStatisticsAvgPoints', [])

    return addPlayers(playersStatistics, 'points')
  },
  playersStatisticsAvgRebounds: async (): Promise<any[]> => {
    const playersStatistics: any[] = await applyMethods('playersStatisticsAvg', 'playersStatisticsAvgRebounds', [])

    return addPlayers(playersStatistics, 'rebounds_sum')
  },
  playersStatisticsAvgAssists: async (): Promise<any[]> => {
    const playersStatistics: any[] = await applyMethods('playersStatisticsAvg', 'playersStatisticsAvgAssists', [])

    return addPlayers(playersStatistics, 'assists')
  },
  playersStatisticsAvgById: async (id: bigint): Promise<any[]> => {
    const playersStatistics: any[] = await applyMethods('playersStatisticsAvg', 'playersStatisticsAvgById', [id])

    if (playersStatistics.length === 0) return []

    playersStatistics[0].player = await applyMethods('players', 'playersById', [id])

    return playersStatistics
  },

  staff: async (): Promise<any[]> => await applyMethods('staff'),
  staffByTeamId: async (id: bigint): Promise<any[]> => await applyMethods('staff', 'staffByTeamId', [id]),

  teams: async (): Promise<any[]> => await applyMethods('teams'),
  teamsById: async (id: bigint): Promise<any[]> => {
    const teams: any[] = await applyMethods('teams', 'teamsById', [id])

    if (teams.length === 0) return []

    for (let i: number = 0; i < teams.length; i++) {
      teams[i].league = (await applyMethods('leagues', 'leaguesById', [teams[i].league_id]))[0]
      teams[i].city = (await applyMethods('cities', 'citiesById', [teams[i].city_id]))[0]
      teams[i].staff = await applyMethods('staff', 'staffByTeamId', [teams[i].id])
    }

    return teams
  },
  teamsByName: async (name: string): Promise<any[]> => {
    const teams: any[] = await applyMethods('teams', 'teamsByName', [name])

    if (teams.length === 0) return []

    for (let i: number = 0; i < teams.length; i++) {
      teams[i].league = (await applyMethods('leagues', 'leaguesById', [teams[i].league_id]))[0]
      teams[i].city = (await applyMethods('cities', 'citiesById', [teams[i].city_id]))[0]
      teams[i].staff = await applyMethods('staff', 'staffByTeamId', [teams[i].id])
      teams[i].players = await applyMethods('players', 'playersByTeamId', [teams[i].id])
    }

    return teams
  },

  leagues: async (): Promise<any[]> => await applyMethods('leagues'),

  matches: async (): Promise<any[]> => await applyMethods('matches'),
  matchesByDate: async (date: string): Promise<any[]> => await applyMethods('matches', 'matchesByDate', [date]),

  schedules: async (): Promise<any[]> => await applyMethods('schedules'),
  schedulesByClosest: async (): Promise<any[]> => await applyMethods('schedules'),
  schedulesByDate: async (date: string): Promise<any[]> => await applyMethods('schedules', 'schedulesByDate', [date]),
  schedulesAfterDate: async (date: string): Promise<any[]> => await applyMethods('schedules', 'schedulesAfterDate', [date]),
  schedulesBeforeDate: async (date: string): Promise<any[]> => await applyMethods('schedules', 'schedulesBeforeDate', [date]),
}
