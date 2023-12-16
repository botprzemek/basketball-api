import { Match, MatchQuery } from 'models/basketball/match.model'

export const matches = (data: MatchQuery): Match => ({
	id: data.id,
	arena_id: data.arena_id,
	league_id: data.league_id,
	timestamp: data.timestamp
})
