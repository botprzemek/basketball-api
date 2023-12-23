import arenaBuilder from 'services/storage/method/builder/arena.builder'
import cityBuilder from 'services/storage/method/builder/city.builder'
import playerBuilder from 'services/storage/method/builder/player.builder'
import teamBuilder from 'services/storage/method/builder/team.builder'
import fundBuilder from 'services/storage/method/builder/fund.builder'
import leagueBuilder from 'services/storage/method/builder/league.builder'
import matchBuilder from 'services/storage/method/builder/match.builder'
import rosterBuilder from 'services/storage/method/builder/roster.builder'
import staffBuilder from 'services/storage/method/builder/staff.builder'
import teamStatisticsBuilder from 'services/storage/method/builder/teamStatistics.builder'

// TODO playersStatistics

export default {
	arenas: arenaBuilder,
	cities: cityBuilder,
	fund: fundBuilder,
	leagues: leagueBuilder,
	match: matchBuilder,
	players: playerBuilder,
	rosters: rosterBuilder,
	staff: staffBuilder,
	teams: teamBuilder,
	teamStatistics: teamStatisticsBuilder
}
