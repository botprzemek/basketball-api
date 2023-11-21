export default {
  players: (data: any): any => ({
    id: data.id,
    team_id: data.team_id,
    name: data.name,
    lastname: data.lastname,
    number: parseInt(data.number),
    height: parseInt(data.height),
    position: data.position,
    age: new Date().getFullYear() - new Date(data.birthday).getFullYear(),
    starter: data.starter,
  }),
  playersStatistics: (data: any): any => ({
    id: data.id,
    match_id: data.match_id,
    player_id: data.player_id,
    team_id: data.team_id,
    minutes: parseInt(data.minutes),
    assists: parseInt(data.assists),
    rebounds_off: parseInt(data.rebounds_off),
    rebounds_def: parseInt(data.rebounds_def),
    inside_fgm: parseInt(data.inside_fgm),
    inside_fga: parseInt(data.inside_fga),
    outside_fgm: parseInt(data.outside_fgm),
    outside_fga: parseInt(data.outside_fga),
    freethrows_fgm: parseInt(data.freethrows_fgm),
    freethrows_fga: parseInt(data.freethrows_fga),
    blocks: parseInt(data.blocks),
    steals: parseInt(data.steals),
    turnovers: parseInt(data.turnovers),
    fouls: parseInt(data.fouls),
  }),
  playersStatisticsTopPoints: (data: any): any => ({
    player_id: data.id,
    points: ((data.freethrows_fgm * 1) + (data.inside_fgm * 2) + (data.outside_fgm * 3)) / data.games_played,
    games_played: parseInt(data.games_played),
    inside_fgm: parseInt(data.inside_fgm),
    outside_fgm: parseInt(data.outside_fgm),
    freethrows_fgm: parseInt(data.freethrows_fgm),
  }),
  staff: (data: any): any => ({
    id: data.id,
    team_id: data.team_id,
    name: data.name,
    lastname: data.lastname,
    role: data.role,
  }),
  teams: (data: any): any => ({
    id: data.id,
    city_id: data.city_id,
    league_id: data.league_id,
    name: data.name,
    won: parseInt(data.won),
    lost: parseInt(data.lost),
  }),
  leagues: (data: any): any => ({
    id: data.id,
    name: data.name,
  }),
  cities: (data: any): any => ({
    id: data.id,
    name: data.name,
  }),
  arena: (data: any): any => ({
    id: data.id,
    name: data.name,
    location: data.location,
  }),
  matches: (data: any): any => ({
    schedule: {
      city: data.schedule.city.name,
      datetime: data.schedule.datetime,
    },
    score: {
      host: data.score !== null ? data.score.host : [],
      opponent: data.score !== null ? data.score.opponent : [],
      final:
        data.score.host !== null || data.score.opponent !== null
          ? [
              data.score.host.reduce((partialSum: number, a: number) => partialSum + a, 0),
              data.score.opponent.reduce((partialSum: number, a: number) => partialSum + a, 0),
            ]
          : [],
    },
    host: data.host.name,
    opponent: data.opponent.name,
  }),
  schedules: (data: any): any => ({
    city: data.city.name,
    datetime: data.datetime,
    match: {
      host: data.match.host.name,
      opponent: data.match.opponent.name,
    },
  }),
}
