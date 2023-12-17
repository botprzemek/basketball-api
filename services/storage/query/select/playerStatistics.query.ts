import cockroachStorage from 'services/storage/cockroach.storage'
import { PlayerStatisticsQuery } from 'models/basketball/playerStatistics.model'

export const playersStatistics = async (): Promise<PlayerStatisticsQuery[]> =>
	cockroachStorage()`
      SELECT player_statistics.*, player.team_id 
      FROM player_statistics, player 
      WHERE player_statistics.player_id = player.id 
      ORDER BY player.lastname ASC`

export const playersStatisticsByTeamId = async ([id]): Promise<PlayerStatisticsQuery[]> =>
	cockroachStorage()`
      SELECT player_statistics.*, player.team_id 
      FROM player_statistics, player 
      WHERE player_statistics.player_id = player.id 
      AND player.team_id = ${id} 
      ORDER BY player.lastname ASC`

export const playersStatisticsAvg = async (): Promise<PlayerStatisticsQuery[]> =>
	cockroachStorage()`
			SELECT *
			FROM player_statistics_average`

export const playersStatisticsAvgPoints = async (): Promise<PlayerStatisticsQuery[]> =>
	cockroachStorage()`
      SELECT player_id, team_id, games_played, inside_fgm, inside_fga, outside_fgm, outside_fga, freethrows_fgm, freethrows_fga 
      FROM player_statistics_average`

export const playersStatisticsAvgRebounds = async (): Promise<PlayerStatisticsQuery[]> =>
	cockroachStorage()`
      SELECT player_id, team_id, games_played, rebounds_off, rebounds_def 
      FROM player_statistics_average`

export const playersStatisticsAvgAssists = async (): Promise<PlayerStatisticsQuery[]> =>
	cockroachStorage()`
      SELECT player_id, team_id, games_played, assists
      FROM player_statistics_average`

export const playersStatisticsAvgByPlayerId = async ([id]): Promise<PlayerStatisticsQuery[]> =>
	cockroachStorage()`
      SELECT *
      FROM player_statistics_average
      WHERE player_id = ${id}`

export const playersStatisticsAvgByTeamId = async ([id]): Promise<PlayerStatisticsQuery[]> =>
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
      FROM player_statistics, player
      WHERE player_statistics.player_id = player.id 
      AND player.team_id = ${id} 
      GROUP BY player_statistics.player_id`
