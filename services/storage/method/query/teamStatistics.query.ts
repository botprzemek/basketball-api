import cockroachStorage from 'services/storage/cockroach.storage'
import { TeamStatisticsQuery } from 'models/api/teamStatistics.model'

export const teamsStatistics = async (): Promise<TeamStatisticsQuery[]> =>
	cockroachStorage()`
      SELECT team_statistics.*, player.team_id 
      FROM team_statistics, player 
      WHERE team_statistics.player_id = player.id 
      ORDER BY player.lastname ASC`
