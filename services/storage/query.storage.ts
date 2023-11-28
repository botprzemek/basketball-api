import * as arenaQuery from 'services/storage/query/arena.query'
import * as cityQuery from 'services/storage/query/city.query'
import * as fundQuery from 'services/storage/query/fund.query'
import * as leagueQuery from 'services/storage/query/league.query'
import * as matchQuery from 'services/storage/query/match.query'
import * as playerQuery from 'services/storage/query/player.query'
import * as playerStatisticsQuery from 'services/storage/query/playerStatistics.query'
import * as rosterQuery from 'services/storage/query/roster.query'
import * as staffQuery from 'services/storage/query/staff.query'
import * as teamQuery from 'services/storage/query/team.query'
import * as teamStatisticsQuery from 'services/storage/query/teamStatistics.query'

export default {
	...arenaQuery,
	...cityQuery,
	...fundQuery,
	...leagueQuery,
	...matchQuery,
	...playerQuery,
	...playerStatisticsQuery,
	...rosterQuery,
	...staffQuery,
	...teamQuery,
	...teamStatisticsQuery
}
