import * as ArenaFilter from 'services/storage/method/filter/arena.filter'
import * as CityFilter from 'services/storage/method/filter/city.filter'
import * as PlayerFilter from 'services/storage/method/filter/player.filter'
import * as PlayerStatisticsFilter from 'services/storage/method/filter/playerStatistics.filter'
import * as StaffFilter from 'services/storage/method/filter/staff.filter'
import * as TeamFilter from 'services/storage/method/filter/team.filter'
import * as LeagueFilter from 'services/storage/method/filter/league.filter'
import * as MatchFilter from 'services/storage/method/filter/match.filter'

export default {
	...ArenaFilter,
	...CityFilter,
	...PlayerFilter,
	...PlayerStatisticsFilter,
	...StaffFilter,
	...TeamFilter,
	...LeagueFilter,
	...MatchFilter
}
