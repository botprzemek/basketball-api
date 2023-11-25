import cockroachStorage from 'services/storage/cockroach.storage'
import defaultConfig from 'configs/default.config'

export default {
  arenas: async (): Promise<any[]> =>
    cockroachStorage()`
      SELECT arena.*
      FROM arena 
      ORDER BY name ASC`,
  arenasById: async (parameters: any[]): Promise<any> =>
    cockroachStorage()`
      SELECT arena.*
      FROM arena 
      WHERE id = ${parameters[0]}`,
  arenasByCityId: async (parameters: any[]): Promise<any> =>
    cockroachStorage()`
      SELECT arena.*
      FROM arena 
      WHERE city_id = ${parameters[0]}`,
  cities: async (): Promise<any[]> =>
    cockroachStorage()`
      SELECT city.*
      FROM city 
      ORDER BY name ASC`,
  citiesById: async (parameters: any[]): Promise<any> =>
    cockroachStorage()`
      SELECT city.*
      FROM city 
      WHERE id = ${parameters[0]}`,
  citiesByName: async (parameters: any[]): Promise<any> =>
    cockroachStorage()`
      SELECT city.*
      FROM city 
      WHERE name = ${parameters[0]}`,
  fund: async (): Promise<any[]> => [await fetch(defaultConfig.fund).then((response: Response): Promise<any> => response.json())],
  fundByUrl: async (parameters: any[]): Promise<any[]> => [await fetch(parameters[0]).then((response: Response): Promise<any> => response.json())],
  leagues: async (): Promise<any> => cockroachStorage()`
      SELECT league.* 
      FROM league 
      ORDER BY name ASC`,
  leaguesById: async (parameters: any[]): Promise<any> =>
    cockroachStorage()`
      SELECT league.* 
      FROM league 
      WHERE id = ${parameters[0]}`,
  matches: async (): Promise<any[]> =>
    cockroachStorage()`
      SELECT match.*
      FROM match 
      ORDER BY timestamp ASC`,
  matchesById: async (parameters: any[]): Promise<any> =>
    cockroachStorage()`
      SELECT match.*
      FROM match 
      WHERE id = ${parameters[0]}`,
  matchesByClosest: async (): Promise<any> =>
    cockroachStorage()`
      SELECT match.*
      FROM match 
      WHERE timestamp > CURRENT_TIMESTAMP
      ORDER BY timestamp ASC 
      LIMIT 1`,
  matchesByDate: async (parameters: any[]): Promise<any> =>
    cockroachStorage()`
      SELECT match.*
      FROM match 
      WHERE timestamp LIKE ${parameters[0] + '%'}`,
  // BETWEEN '2023-01-01 00:00:00' AND '2023-12-31 23:59:59'
  matchesAfterDate: async (parameters: any[]): Promise<any> =>
    cockroachStorage()`
      SELECT match.*
      FROM match 
      WHERE id = ${parameters[0]}`,
  matchesBeforeDate: async (parameters: any[]): Promise<any> =>
    cockroachStorage()`
      SELECT match.*
      FROM match 
      WHERE id = ${parameters[0]}`,
  players: async (): Promise<any> =>
    cockroachStorage()`
      SELECT player.* 
      FROM player 
      ORDER BY lastname ASC`,
  playersById: async (parameters: any[]): Promise<any> =>
    cockroachStorage()`
      SELECT player.* 
      FROM player 
      WHERE id = ${parameters[0]}`,
  playersByName: async (parameters: any[]): Promise<any> =>
    cockroachStorage()`
      SELECT player.* 
      FROM player 
      WHERE CONCAT(name, \' \', lastname) 
      LIKE ${'%' + parameters[0] + '%'} 
      ORDER BY lastname ASC`,
  playersByTeamId: async (parameters: any[]): Promise<any> =>
    cockroachStorage()`
      SELECT player.* 
      FROM player 
      WHERE team_id = ${parameters[0]} 
      ORDER BY starter DESC, lastname ASC`,
  playersStatistics: async (): Promise<any[]> =>
    cockroachStorage()`
      SELECT player_statistics.*, player.team_id 
      FROM player_statistics, player 
      WHERE player_statistics.player_id = player.id 
      ORDER BY player.lastname ASC`,
  playersStatisticsByTeamId: async (parameters: any[]): Promise<any> =>
    cockroachStorage()`
      SELECT player_statistics.*, player.team_id 
      FROM player_statistics, player 
      WHERE player_statistics.player_id = player.id 
      AND player.team_id = ${parameters[0]} 
      ORDER BY player.lastname ASC`,
  playersStatisticsAvg: async (): Promise<any[]> =>
    cockroachStorage()`
      SELECT player_statistics.player_id, 
      COUNT(player_statistics.player_id) AS games_played, 
      SUM(player_statistics.minutes) AS minutes, 
      SUM(player_statistics.assists) AS assists, 
      SUM(player_statistics.rebounds_off) AS rebounds_off, 
      SUM(player_statistics.rebounds_def) AS rebounds_def, 
      SUM(player_statistics.inside_fgm) AS inside_fgm,  
      SUM(player_statistics.inside_fga) AS inside_fga, 
      SUM(player_statistics.outside_fgm) AS outside_fgm, 
      SUM(player_statistics.outside_fga) AS outside_fga, 
      SUM(player_statistics.freethrows_fgm) AS freethrows_fgm, 
      SUM(player_statistics.freethrows_fga) AS freethrows_fga, 
      SUM(player_statistics.blocks) AS blocks, 
      SUM(player_statistics.steals) AS steals, 
      SUM(player_statistics.turnovers) AS turnovers, 
      SUM(player_statistics.fouls) AS fouls 
      FROM player_statistics 
      GROUP BY player_statistics.player_id`,
  playersStatisticsAvgPoints: async (): Promise<any[]> =>
    cockroachStorage()`
      SELECT player_statistics.player_id, 
      COUNT(player_statistics.player_id) AS games_played, 
      SUM(player_statistics.inside_fgm) AS inside_fgm, 
      SUM(player_statistics.inside_fga) AS inside_fga, 
      SUM(player_statistics.outside_fgm) AS outside_fgm,
      SUM(player_statistics.outside_fga) AS outside_fga, 
      SUM(player_statistics.freethrows_fgm) AS freethrows_fgm, 
      SUM(player_statistics.freethrows_fga) AS freethrows_fga 
      FROM player_statistics 
      GROUP BY player_statistics.player_id`,
  playersStatisticsAvgRebounds: async (): Promise<any[]> =>
    cockroachStorage()`
      SELECT player_statistics.player_id, 
      COUNT(player_statistics.player_id) AS games_played, 
      SUM(player_statistics.rebounds_off) AS rebounds_off, 
      SUM(player_statistics.rebounds_def) AS rebounds_def 
      FROM player_statistics 
      GROUP BY player_statistics.player_id`,
  playersStatisticsAvgAssists: async (): Promise<any[]> =>
    cockroachStorage()`
      SELECT player_statistics.player_id, 
      COUNT(player_statistics.player_id) AS games_played, 
      SUM(player_statistics.assists) AS assists 
      FROM player_statistics 
      GROUP BY player_statistics.player_id`,
  playersStatisticsAvgById: async (parameters: any[]): Promise<any> =>
    cockroachStorage()`
      SELECT player_statistics.player_id, 
      COUNT(player_statistics.player_id) AS games_played, 
      SUM(player_statistics.minutes) AS minutes, 
      SUM(player_statistics.assists) AS assists, 
      SUM(player_statistics.rebounds_off) AS rebounds_off, 
      SUM(player_statistics.rebounds_def) AS rebounds_def, 
      SUM(player_statistics.inside_fgm) AS inside_fgm, 
      SUM(player_statistics.inside_fga) AS inside_fga, 
      SUM(player_statistics.outside_fgm) AS outside_fgm, 
      SUM(player_statistics.outside_fga) AS outside_fga, 
      SUM(player_statistics.freethrows_fgm) AS freethrows_fgm, 
      SUM(player_statistics.freethrows_fga) AS freethrows_fga, 
      SUM(player_statistics.blocks) AS blocks, 
      SUM(player_statistics.steals) AS steals, 
      SUM(player_statistics.turnovers) AS turnovers, 
      SUM(player_statistics.fouls) AS fouls
      FROM player_statistics 
      WHERE player_statistics.player_id = ${parameters[0]} 
      GROUP BY player_statistics.player_id`,
  rosters: async (): Promise<any[]> => cockroachStorage()`
      SELECT roster.*, player.* 
      FROM roster, player_roster, player
      WHERE player.id = player_roster.player_id`,
  rostersById: async (parameters: any[]): Promise<any[]> => cockroachStorage()`
      SELECT roster.*, player.* 
      FROM roster, player_roster, player
      WHERE player.id = player_roster.player_id
      AND roster.id = ${parameters[0]}`,
  rostersByMatchId: async (parameters: any[]): Promise<any[]> => cockroachStorage()`
      SELECT roster.*, player.* 
      FROM roster, player_roster, player
      WHERE player.id = player_roster.player_id
      AND roster.match_id = ${parameters[0]}`,
  staff: async (): Promise<any[]> =>
    cockroachStorage()`
      SELECT staff.*, team_staff.team_id 
      FROM staff, team_staff 
      WHERE staff.id = team_staff.staff_id 
      ORDER BY staff.lastname ASC`,
  staffByTeamId: async (parameters: any[]): Promise<any> =>
    cockroachStorage()`
      SELECT staff.*, team_staff.team_id 
      FROM staff, team_staff 
      WHERE team_staff.team_id = ${parameters[0]} 
      ORDER BY staff.lastname ASC`,
  teams: async (): Promise<any[]> => cockroachStorage()`
      SELECT team.* 
      FROM team 
      ORDER BY name ASC`,
  teamsById: async (parameters: any[]): Promise<any> =>
    cockroachStorage()`
      SELECT team.* 
      FROM team 
      WHERE id = ${parameters[0]}`,
  teamsByName: async (parameters: any[]): Promise<any> =>
    cockroachStorage()`
      SELECT team.* 
      FROM team 
      WHERE name = ${parameters[0]}`,
  teamsByCityId: async (parameters: any[]): Promise<any> =>
    cockroachStorage()`
      SELECT team.* 
      FROM team 
      WHERE city_id = ${parameters[0]}
      ORDER BY name ASC`,
}
