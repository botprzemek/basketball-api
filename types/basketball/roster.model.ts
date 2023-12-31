import { Player, PlayerQuery } from 'models/basketball/player.model'

export interface RosterQuery extends PlayerQuery {
	id: bigint
	match_id: bigint
	team_id: bigint
}

export interface Roster extends Player {
	id: bigint
	match_id: bigint
	team_id: bigint
}
