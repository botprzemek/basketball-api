import * as arenaFilter from 'services/storage/method/filter/arena.filter'
import * as cityFilter from 'services/storage/method/filter/city.filter'
import * as fundFilter from 'services/storage/method/filter/fund.filter'
import * as playerFilter from 'services/storage/method/filter/player.filter'
import * as playerStatisticsFilter from 'services/storage/method/filter/playerStatistics.filter'
import * as rosterFilter from 'services/storage/method/filter/roster.filter'
import * as staffFilter from 'services/storage/method/filter/staff.filter'
import * as teamFilter from 'services/storage/method/filter/team.filter'
import * as leagueFilter from 'services/storage/method/filter/league.filter'
import * as matchFilter from 'services/storage/method/filter/match.filter'

export default {
	...arenaFilter,
	...cityFilter,
	...fundFilter,
	...playerFilter,
	...playerStatisticsFilter,
	...rosterFilter,
	...staffFilter,
	...teamFilter,
	...leagueFilter,
	...matchFilter
}
