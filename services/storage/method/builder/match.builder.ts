import { Match, MatchQuery } from 'types/basketball/match.model'

export default (data: MatchQuery): Match => ({
	id: data.id,
	arena_id: data.arena_id,
	league_id: data.league_id,
	timestamp: data.timestamp
})
