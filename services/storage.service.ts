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
  playersStatisticsByTeamId: async (id: bigint): Promise<any[]> => await applyMethods('playersStatistics', 'playersStatisticsByTeamId', [id]),
  playersStatisticsTopPoints: async (): Promise<any[]> => {
    const playersStatistics: any[] = await applyMethods('playersStatistics', 'playersStatisticsTopPoints', [])

    // for (let i: number = 0; i < playersStatistics.length; i++) {
    //   playersStatistics[i].player = await applyMethods('players', 'playersById', [playersStatistics[i].player_id])
    // }
    //
    // playersStatistics.sort((a: any, b: any) => b.points - a.points)
    //
    // playersStatistics.length = 3

    return playersStatistics
  },

  staff: async (): Promise<any[]> => await applyMethods('staff'),
  staffByTeamId: async (id: bigint): Promise<any[]> => await applyMethods('staff', 'staffByTeamId', [id]),

  teams: async (): Promise<any[]> => await applyMethods('teams'),
  teamsById: async (id: bigint): Promise<any[]> => {
    const teams: any[] = await applyMethods('teams', 'teamsById', [id])

    for (let i: number = 0; i < teams.length; i++) {
      teams[i].league = (await applyMethods('leagues', 'leaguesById', [teams[i].league_id]))[0]
      teams[i].city = (await applyMethods('cities', 'citiesById', [teams[i].city_id]))[0]
      teams[i].staff = await applyMethods('staff', 'staffByTeamId', [teams[i].id])
      teams[i].players = await applyMethods('players', 'playersByTeamId', [teams[i].id])
    }

    return teams
  },
  teamsByName: async (name: string): Promise<any[]> => {
    const teams: any[] = await applyMethods('teams', 'teamsByName', [name])

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
