import cockroachStorage from 'services/storage/cockroach.storage'
import { RosterQuery } from 'models/api/roster.model'

export const rosters = async (): Promise<RosterQuery[]> =>
	cockroachStorage()`
      SELECT roster.id, roster.match_id, player.* 
      FROM player_roster, roster, player
      WHERE player_roster.player_id = player.id
      AND player_roster.roster_id = roster.id`

export const rostersById = async ([id]): Promise<RosterQuery[]> =>
	cockroachStorage()`
      SELECT roster.id, roster.match_id, player.* 
      FROM player_roster, roster, player
      WHERE player_roster.player_id = player.id
      AND roster.id = ${id}`

export const rostersByMatchId = async ([id]): Promise<RosterQuery[]> =>
	cockroachStorage()`
      SELECT roster.id, roster.match_id, player.* 
      FROM player_roster, roster, player
      WHERE player_roster.player_id = player.id
      AND player_roster.roster_id = roster.id
      AND roster.match_id = ${id}`
