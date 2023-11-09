import {
  type MatchFiltered,
  type MatchSelected,
  type PlayerFiltered,
  type PlayerSelected,
  type ScheduleFiltered,
  type ScheduleSelected,
  type TeamFiltered,
  type TeamSelected,
} from 'models/query/data.model'
import processUtil from 'services/storage/method/processData.method'
import { LeagueFiltered, LeagueSelected } from 'models/query/league.model'

export default {
  players: (record: PlayerSelected): PlayerFiltered => ({
    name: record.name,
    lastname: record.lastname,
    number: record.number,
    height: record.height,
    position: record.position,
    age: record.age,
  }),
  teams: (record: TeamSelected): TeamFiltered => ({
    name: record.name,
    won: record.won,
    lost: record.lost,
    city: record.city.name,
    league: record.league.name,
    players: processUtil.typeFilter('players', record.players),
  }),
  teamsInLeague: (record: TeamSelected) => ({
    name: record.name,
    won: record.won,
    lost: record.lost,
    city: record.city.name,
  }),
  matches: (record: MatchSelected): MatchFiltered => ({
    schedule: {
      city: record.schedule.city.name,
      datetime: record.schedule.datetime,
    },
    score: {
      host: record.score !== null ? record.score.host : [],
      opponent: record.score !== null ? record.score.opponent : [],
      final:
        record.score.host !== null || record.score.opponent !== null
          ? [
              record.score.host.reduce((partialSum: number, a: number) => partialSum + a, 0),
              record.score.opponent.reduce((partialSum: number, a: number) => partialSum + a, 0),
            ]
          : [],
    },
    host: record.host.name,
    opponent: record.opponent.name,
  }),
  schedules: (record: ScheduleSelected): ScheduleFiltered => ({
    city: record.city.name,
    datetime: record.datetime,
    match: {
      host: record.match.host.name,
      opponent: record.match.opponent.name,
    },
  }),
  leagues: (record: LeagueSelected): LeagueFiltered => ({
    name: record.name,
    city: record.city.name,
    teams: processUtil.typeFilter('teamsInLeague', record.teams),
  }),
}
