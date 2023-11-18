import * as cache from 'services/storage/cache.storage'
import responseFilter from 'services/storage/method/processData.method'
import {MatchFiltered, PlayerFiltered, ScheduleFiltered, TeamFiltered} from 'models/query/data.model'
import cockroachStorage from 'services/storage/cockroach.storage'
import {QueryResult} from 'pg'
import {LeagueFiltered} from 'models/query/league.model'
import {schedules, schedulesAfterDate, schedulesBeforeDate, schedulesByDate} from 'controllers/api/schedule.controller'

const queries = {
  players: 'SELECT player.* FROM player ORDER BY lastname ASC',
  playersById: 'SELECT player.* FROM player WHERE id = $1',
  playersByName: 'SELECT player.* FROM player WHERE CONCAT(name, \' \', lastname) LIKE $1 ORDER BY lastname ASC',
  playersByTeamId: 'SELECT player.* FROM player WHERE team_id = $1 ORDER BY starter DESC, lastname ASC',
  playersByTeamName: 'SELECT player.* FROM player, team WHERE player.team_id = team.id AND team.name = $1 ORDER BY player.starter DESC, player.lastname ASC',
  staff: 'SELECT staff.* FROM staff ORDER BY lastname ASC',
  staffByTeamId: 'SELECT staff.* FROM staff, team_staff WHERE staff.id = team_staff.staff_id AND team_staff.team_id = $1 ORDER BY staff.lastname ASC',
  staffByTeamName: 'SELECT staff.* FROM staff, team_staff WHERE staff.id = team_staff.staff_id AND team_staff.team_name = $1 ORDER BY staff.lastname ASC',
  teams: 'SELECT team.* FROM team',
  teamsById: 'SELECT team.* FROM team WHERE id = $1',
  teamsByName: 'SELECT team.* FROM team WHERE name = $1',
  leagues: 'SELECT league.* FROM league',
}

const getData = async <TypeSelected>(key: string, method?: string, value?: any): Promise<TypeSelected[]> => {
  const cachedData: TypeSelected[] = cache.getData(key)
  if (cachedData) return responseFilter[key](cachedData, method, value)
  // const data: TypeSelected[] = method ? (await getPrisma())[key](method) : (await getPrisma())[key]()
  return responseFilter[key](cache.setData(key, null), method, value)
}

export default {
  players: (data: (response: PlayerFiltered[]) => void): void => {
    cockroachStorage(queries.players, [], (error: Error, response: QueryResult): void => {
      return error ? data([]) : data(response.rows)
    })
  },
  playersById: (id: bigint, data: (response: PlayerFiltered[]) => void): void => {
    cockroachStorage(queries.playersById, [id], (error: Error, response: QueryResult): void => {
      return error ? data([]) : data(response.rows)
    })
  },
  playersByName: (name: string, data: (response: PlayerFiltered[]) => void): void => {
    cockroachStorage(queries.playersByName, [`%${name}%`], (error: Error, response: QueryResult): void => {
      return error ? data([]) : data(response.rows)
    })
  },
  playersByTeamId: (id: bigint, data: (response: PlayerFiltered[]) => void): void => {
    cockroachStorage(queries.playersByTeamId, [id], (error: Error, response: QueryResult): void => {
      return error ? data([]) : data(response.rows)
    })
  },
  playersByTeamName: (name: string, data: (response: PlayerFiltered[]) => void): void => {
    cockroachStorage(queries.playersByTeamName, [name], (error: Error, response: QueryResult): void => {
      return error ? data([]) : data(response.rows)
    })
  },
  staff: (data: (response: any[]) => void): void => {
    cockroachStorage(queries.staff, [], (error: Error, response: QueryResult): void => {
      return error ? data([]) : data(response.rows)
    })
  },
  staffByTeamId: (id: bigint, data: (response: any[]) => void): void => {
    cockroachStorage(queries.staffByTeamId, [id], (error: Error, response: QueryResult): void => {
      return error ? data([]) : data(response.rows)
    })
  },
  staffByTeamName: (name: string, data: (response: any[]) => void): void => {
    cockroachStorage(queries.staffByTeamName, [name], (error: Error, response: QueryResult): void => {
      return error ? data([]) : data(response.rows)
    })
  },
  teams: (data: (response: TeamFiltered[]) => void): void => {
    cockroachStorage(queries.teams, [], (error: Error, response: QueryResult): void => {
      return error ? data([]) : data(response.rows)
    })
  },
  teamsById: (id: bigint, data: (response: TeamFiltered[]) => void): void => {
    cockroachStorage(queries.teamsById, [id], (error: Error, response: QueryResult): void => {
      return error ? data([]) : data(response.rows)
    })
  },
  teamsByName: (name: string, data: (response: TeamFiltered[]) => void): void => {
    cockroachStorage(queries.teamsByName, [name], (error: Error, response: QueryResult): void => {
      return error ? data([]) : data(response.rows)
    })
  },
  matches: async (): Promise<MatchFiltered[]> => await getData('matches'),
  matchesByDate: async (date: string): Promise<MatchFiltered[]> => await getData('matches', 'matchesByDate', date),
  schedules: async (): Promise<ScheduleFiltered[]> => await getData('schedules'),
  schedulesByClosest: (): any => {},
  schedulesByDate: async (date: string): Promise<ScheduleFiltered[]> => await getData('schedules', 'schedulesByDate', date),
  schedulesAfterDate: async (date: string): Promise<ScheduleFiltered[]> => await getData('schedules', 'schedulesAfterDate', date),
  schedulesBeforeDate: async (date: string): Promise<ScheduleFiltered[]> => await getData('schedules', 'schedulesBeforeDate', date),
  leagues: (data: (response: LeagueFiltered[]) => void): void => {
    cockroachStorage(queries.leagues, [], (error: Error, response: QueryResult): void => {
      return error ? data([]) : data(response.rows)
    })
  },
}
