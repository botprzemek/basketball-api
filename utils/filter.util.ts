import { type MatchSelected, type PlayerSelected, type TeamSelected } from 'models/query.model'

export default {
  playersByName: (data: PlayerSelected[], name: string): PlayerSelected[] => {
    return data.filter((player: PlayerSelected): boolean => {
      return `${player.name.toLowerCase()} ${player.lastname.toLowerCase()}`.includes(name.toLowerCase())
    })
  },
  playersByTeam: (data: TeamSelected[], name: string): PlayerSelected[] => {
    return data
      .filter((team: TeamSelected): boolean => {
        return team.name.toLowerCase() === name.toLowerCase()
      })
      .flatMap((team: TeamSelected) => team.players)
  },
  teamsByName: (data: TeamSelected[], name: string): TeamSelected[] => {
    return data.filter((team: TeamSelected): boolean => {
      return team.name.toLowerCase().includes(name.toLowerCase())
    })
  },
  matchesByDate: (data: MatchSelected[], date: string): MatchSelected[] => {
    return data.filter((match: MatchSelected): boolean => {
      const scheduleDate: string = new Date(match.schedule.datetime).toISOString().split('T')[0]
      return date === scheduleDate
    })
  },
}
