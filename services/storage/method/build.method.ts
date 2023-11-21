export default {
  players: (data: any): any => ({
    id: data.id,
    team_id: data.team_id,
    name: data.name,
    lastname: data.lastname,
    number: data.number,
    height: data.height,
    position: data.position,
    age: new Date().getFullYear() - new Date(data.birthday).getFullYear(),
    starter: data.starter,
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
    won: data.won,
    lost: data.lost,
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
    location: data.location
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
