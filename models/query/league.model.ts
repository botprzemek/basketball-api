import { TeamFiltered, TeamSelected } from 'models/query/data.model'

export interface LeagueQuery {
  where: {}
  select: {
    name: boolean
    city: boolean
    teams: {
      select: {
        name: boolean
        city: {
          select: {
            name: boolean
          }
        }
        won: boolean
        lost: boolean
      }
    }
  }
}

export interface LeagueSelected {
  name: string
  city: {
    id: number
    name: string
    state: string
  }
  teams: TeamSelected[]
}

export interface LeagueFiltered {
  name: string
  city: string
  teams: TeamFiltered[]
}
