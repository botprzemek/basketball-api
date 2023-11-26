import cockroachStorage from 'services/storage/cockroach.storage'
import { RosterQuery } from 'models/api/roster.model'

export const rosters = async (): Promise<RosterQuery[]> =>
	cockroachStorage()`
      SELECT roster.id, roster.match_id, player.* 
      FROM roster, player_roster, player
      WHERE player.id = player_roster.player_id`

export const rostersById = async (parameters: any[]): Promise<RosterQuery[]> =>
	cockroachStorage()`
      SELECT roster.id, roster.match_id, player.* 
      FROM roster, player_roster, player
      WHERE player.id = player_roster.player_id
      AND roster.id = ${parameters[0]}`

export const rostersByMatchId = async (parameters: any[]): Promise<RosterQuery[]> =>
	cockroachStorage()`
      SELECT roster.id, roster.match_id, player.* 
      FROM roster, player_roster, player
      WHERE player.id = player_roster.player_id
      AND roster.match_id = ${parameters[0]}`
