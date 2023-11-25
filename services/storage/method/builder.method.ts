import * as arenaBuilder from 'services/storage/method/builder/arena.builder'
import * as cityBuilder from 'services/storage/method/builder/city.builder'
import * as leagueBuilder from 'services/storage/method/builder/league.builder'
import * as matchBuilder from 'services/storage/method/builder/match.builder'
import * as playerBuilder from 'services/storage/method/builder/player.builder'
import * as playerStatisticsBuilder from 'services/storage/method/builder/playerStatistics.builder'
import * as rosterBuilder from 'services/storage/method/builder/roster.builder'
import * as staffBuilder from 'services/storage/method/builder/staff.builder'
import * as teamBuilder from 'services/storage/method/builder/team.builder'

export default {
	...arenaBuilder,
	...cityBuilder,
	...leagueBuilder,
	...matchBuilder,
	...playerBuilder,
	...playerStatisticsBuilder,
	...rosterBuilder,
	...staffBuilder,
	...teamBuilder
}
