import * as arenaQuery from 'services/storage/method/query/arena.query'
import * as cityQuery from 'services/storage/method/query/city.query'
import * as fundQuery from 'services/storage/method/query/fund.query'
import * as leagueQuery from 'services/storage/method/query/league.query'
import * as matchQuery from 'services/storage/method/query/match.query'
import * as playerQuery from 'services/storage/method/query/player.query'
import * as playerStatisticsQuery from 'services/storage/method/query/playerStatistics.query'
import * as rosterQuery from 'services/storage/method/query/roster.query'
import * as staffQuery from 'services/storage/method/query/staff.query'
import * as teamQuery from 'services/storage/method/query/team.query'
import * as teamStatisticsQuery from 'services/storage/method/query/teamStatistics.query'

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
