import getMethod from 'services/storage/method/get.method'
import processMethod from 'services/storage/method/process.method'

const applyMethods = async (key: string, method?: string, parameters?: any[]): Promise<any[]> => {
  const data: any[] = await getMethod(key, method, parameters)
  return processMethod(data, method, parameters)
}

export default {
  arenas: async (): Promise<any[]> => await applyMethods('arenas'),
  arenasById: async (id: bigint): Promise<any[]> => await applyMethods('arenas', 'arenasById', [id]),
  arenasByCityId: async (id: bigint): Promise<any[]> => await applyMethods('arenas', 'arenasByCityId', [id]),

  cities: async (): Promise<any[]> => await applyMethods('cities'),
  citiesById: async (id: bigint): Promise<any[]> => await applyMethods('cities', 'citiesById', [id]),
  citiesByName: async (name: string): Promise<any[]> => await applyMethods('cities', 'citiesByName', [name]),

  fund: async (): Promise<any[]> => await applyMethods('fund'),
  fundByUrl: async (url: string): Promise<any[]> => await applyMethods('fund', 'fundByUrl', [url]),

  leagues: async (): Promise<any[]> => await applyMethods('leagues'),
  leaguesById: async (id: bigint): Promise<any[]> => await applyMethods('leagues', 'leaguesById', [id]),

  matches: async (): Promise<any[]> => await applyMethods('matches'),
  matchesById: async (id: bigint): Promise<any[]> => await applyMethods('matches', 'matchesById', [id]),
  matchesByClosest: async (): Promise<any[]> => await applyMethods('matches', 'matchesByClosest', []),
  matchesByDate: async (date: string): Promise<any[]> => await applyMethods('matches', 'matchesByDate', [date]),
  matchesAfterDate: async (date: string): Promise<any[]> => await applyMethods('matches', 'matchesAfterDate', [date]),
  matchesBeforeDate: async (date: string): Promise<any[]> => await applyMethods('matches', 'matchesBeforeDate', [date]),

  players: async (): Promise<any[]> => await applyMethods('players'),
  playersById: async (id: bigint): Promise<any[]> => await applyMethods('players', 'playersById', [id]),
  playersByName: async (name: string): Promise<any[]> => await applyMethods('players', 'playersByName', [name]),
  playersByTeamId: async (id: bigint): Promise<any[]> => await applyMethods('players', 'playersByTeamId', [id]),

  playersStatistics: async (): Promise<any[]> => await applyMethods('playersStatistics'),
  playersStatisticsById: async (id: bigint): Promise<any[]> => await applyMethods('playersStatistics', 'playersStatisticsById', [id]),
  playersStatisticsByTeamId: async (id: bigint): Promise<any[]> => await applyMethods('playersStatistics', 'playersStatisticsByTeamId', [id]),
  playersStatisticsAvg: async (): Promise<any[]> => await applyMethods('playersStatisticsAvg', 'playersStatisticsAvg', []),
  playersStatisticsAvgPoints: async (): Promise<any[]> => await applyMethods('playersStatisticsAvg', 'playersStatisticsAvgPoints', []),
  playersStatisticsAvgRebounds: async (): Promise<any[]> => await applyMethods('playersStatisticsAvg', 'playersStatisticsAvgRebounds', []),
  playersStatisticsAvgAssists: async (): Promise<any[]> => await applyMethods('playersStatisticsAvg', 'playersStatisticsAvgAssists', []),
  playersStatisticsAvgById: async (id: bigint): Promise<any[]> => await applyMethods('playersStatisticsAvg', 'playersStatisticsAvgById', [id]),

  rosters: async (): Promise<any[]> => await applyMethods('rosters'),
  rostersById: async (id: bigint): Promise<any[]> => await applyMethods('rosters', 'rostersById', [id]),
  rostersByMatchId: async (id: bigint): Promise<any[]> => await applyMethods('rosters', 'rostersByMatchId', [id]),

  staff: async (): Promise<any[]> => await applyMethods('staff'),
  staffByTeamId: async (id: bigint): Promise<any[]> => await applyMethods('staff', 'staffByTeamId', [id]),

  teams: async (): Promise<any[]> => await applyMethods('teams'),
  teamsById: async (id: bigint): Promise<any[]> => await applyMethods('teams', 'teamsById', [id]),
  teamsByName: async (name: string): Promise<any[]> => await applyMethods('teams', 'teamsByName', [name]),
  teamsByCityId: async (id: bigint): Promise<any[]> => await applyMethods('teams', 'teamsByCityId', [id]),

  teamStatisticsByTeamId: async (): Promise<any[]> => await applyMethods('teamStatistics'),
  teamStatisticsAvgByTeamId: async (id: bigint): Promise<any[]> => await applyMethods('teamStatistics', 'teamStatisticsAvgByTeamId', [id]),
  teamStatisticsByMatchId: async (id: bigint): Promise<any[]> => await applyMethods('teamStatistics', 'teamStatisticsByMatchId', [id]),
}
