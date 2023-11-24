import getMethod from "services/storage/method/get.method";
import processMethod from "services/storage/method/process.method";

const applyMethods = async (key: string, method?: string, parameters?: any[]): Promise<any[]> => {
  const data: any[] = await getMethod(key, method, parameters)
  return processMethod(key, data, method, parameters)
}

export default {
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

  staff: async (): Promise<any[]> => await applyMethods('staff'),
  staffByTeamId: async (id: bigint): Promise<any[]> => await applyMethods('staff', 'staffByTeamId', [id]),

  teams: async (): Promise<any[]> => await applyMethods('teams'),
  teamsById: async (id: bigint): Promise<any[]> => await applyMethods('teams', 'teamsById', [id]),
  teamsByName: async (name: string): Promise<any[]> => await applyMethods('teams', 'teamsByName', [name]),

  leagues: async (): Promise<any[]> => await applyMethods('leagues'),

  matches: async (): Promise<any[]> => await applyMethods('matches'),
  matchesByDate: async (date: string): Promise<any[]> => await applyMethods('matches', 'matchesByDate', [date]),

  schedules: async (): Promise<any[]> => await applyMethods('schedules'),
  schedulesByClosest: async (): Promise<any[]> => await applyMethods('schedules'),
  schedulesByDate: async (date: string): Promise<any[]> => await applyMethods('schedules', 'schedulesByDate', [date]),
  schedulesAfterDate: async (date: string): Promise<any[]> => await applyMethods('schedules', 'schedulesAfterDate', [date]),
  schedulesBeforeDate: async (date: string): Promise<any[]> => await applyMethods('schedules', 'schedulesBeforeDate', [date]),
}
