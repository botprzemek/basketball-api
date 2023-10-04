import {
  type LeagueFiltered,
  type LeagueSelected,
  type MatchFiltered,
  type MatchSelected,
  type PlayerFiltered,
  type PlayerSelected,
  type ScheduleFiltered,
  type ScheduleSelected,
  type TeamFiltered,
  type TeamSelected,
} from 'models/data.model'
import processUtil from 'utils/storage/process.storage'

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
    city: record.city.name,
    league: record.league.name,
    players: processUtil.typeFilter('players', record.players),
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
        record.score !== null
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
    teams: processUtil.typeFilter('teams', record.teams),
  }),
}
