import { MatchFiltered, MatchSelect, TeamFiltered, TeamSelect } from 'models/Query.model'

type Methods = {
  matchByDate: (data: MatchFiltered[], date: string) => MatchFiltered[]
  teamByName: (data: TeamFiltered[], name: string) => TeamFiltered[]
}

const teamFilter = (data: TeamSelect[], method?: string, value?: any): TeamFiltered[] => {
  const filtered: TeamFiltered[] = []
  data.forEach((team: TeamSelect): void => {
    filtered.push({
      name: team.name,
      city: team.city.name,
      league: team.league.name,
      players: team.players,
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
  matchByDate: (data: MatchFiltered[], date: string): MatchFiltered[] => {
    return data.filter((match: MatchFiltered): boolean => {
      const scheduleDate: string = new Date(match.schedule.datetime).toISOString().split('T')[0]
      return date === scheduleDate
    })
  },
  teamByName: (data: TeamFiltered[], name: string): TeamFiltered[] => {
    return data.filter((team: TeamFiltered): boolean => {
      return team.name.includes(name)
    })
  },
}

export default {
  methods,
  teamFilter: (data: TeamSelect[], method?: string, value?: any) => teamFilter(data, method, value),
  matchFilter: (data: MatchSelect[], method?: string, value?: any) => matchFilter(data, method, value),
}
