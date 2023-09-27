import { MatchFiltered, MatchSelect, PlayerFiltered, PlayerSelect, TeamFiltered, TeamSelect } from 'models/Query.model'
import { Methods } from 'models/Methods.model'

const playerFilter = (data: PlayerSelect[], method?: string, value?: any): PlayerFiltered[] => {
  const filtered: PlayerFiltered[] = []
  data.forEach((player: PlayerSelect): void => {
    filtered.push({
      name: player.name,
      lastname: player.lastname,
      number: player.number,
      height: player.height,
      position: player.position,
      age: player.age,
      team: player.team.name,
      league: player.team.league.name,
    })
  })

  return method ? methods[method](filtered, value) : filtered
}

const teamFilter = (data: TeamSelect[], method?: string, value?: any): TeamFiltered[] => {
  const filtered: TeamFiltered[] = []
  data.forEach((team: TeamSelect): void => {
    const players: PlayerFiltered[] = playerFilter(
      team.players.map((player: PlayerSelect): PlayerSelect => {
        return {
          name: player.name,
          lastname: player.lastname,
          number: player.number,
          height: player.height,
          position: player.position,
          age: player.age,
          team: {
            name: team.name,
            league: {
              name: team.league.name,
            },
          },
        }
      }),
    )
    filtered.push({
      name: team.name,
      city: team.city.name,
      league: team.league.name,
      players: players,
    })
  })

  return method ? methods[method](filtered, value) : filtered
}

const matchFilter = (data: MatchSelect[], method?: string, value?: any): MatchFiltered[] => {
  const filtered: MatchFiltered[] = []
  data.forEach((match: MatchSelect): void => {
    filtered.push({
      schedule: {
        city: match.schedule.city.name,
        datetime: match.schedule.datetime,
      },
      score: {
        host: match.score !== null ? match.score.host : [],
        opponent: match.score !== null ? match.score.opponent : [],
        final:
          match.score !== null
            ? [
                match.score.host.reduce((partialSum: number, a: number) => partialSum + a, 0),
                match.score.opponent.reduce((partialSum: number, a: number) => partialSum + a, 0),
              ]
            : [],
      },
      host: match.host.name,
      opponent: match.opponent.name,
    })
  })

  return method ? methods[method](filtered, value) : filtered
}

const methods: Methods = {
  playerByName: (data: PlayerFiltered[], name: string): PlayerFiltered[] => {
    return data.filter((player: PlayerFiltered): boolean => {
      return `${player.name.toLowerCase()} ${player.lastname.toLowerCase()}`.includes(name.toLowerCase())
    })
  },
  playerByTeam: (data: PlayerFiltered[], name: string): PlayerFiltered[] => {
    return data.filter((player: PlayerFiltered): boolean => {
      return player.team.toLowerCase().includes(name.toLowerCase())
    })
  },
  teamByName: (data: TeamFiltered[], name: string): TeamFiltered[] => {
    return data.filter((team: TeamFiltered): boolean => {
      return team.name.toLowerCase().includes(name.toLowerCase())
    })
  },
  matchByDate: (data: MatchFiltered[], date: string): MatchFiltered[] => {
    return data.filter((match: MatchFiltered): boolean => {
      const scheduleDate: string = new Date(match.schedule.datetime).toISOString().split('T')[0]
      return date === scheduleDate
    })
  },
}

export default {
  methods,
  playerFilter: (data: PlayerSelect[], method?: string, value?: any) => playerFilter(data, method, value),
  teamFilter: (data: TeamSelect[], method?: string, value?: any) => teamFilter(data, method, value),
  matchFilter: (data: MatchSelect[], method?: string, value?: any) => matchFilter(data, method, value),
}
