import { MatchFiltered, PlayerFiltered, TeamFiltered } from 'models/query.model'

export type Methods = {
  playerByName: (data: PlayerFiltered[], name: string) => PlayerFiltered[]
  playerByTeam: (data: PlayerFiltered[], name: string) => PlayerFiltered[]
  teamByName: (data: TeamFiltered[], name: string) => TeamFiltered[]
  matchByDate: (data: MatchFiltered[], date: string) => MatchFiltered[]
}
