export interface TeamSelect {
  name: string
  city: {
    name: string
  }
  league: {
    name: string
  }
  players: any[]
}

export interface TeamFiltered {
  name: string
  city: string
  league: string
  players: any[]
}

export interface MatchSelect {
  schedule: {
    city: {
      id: number
      name: string
      state: string
    }
    datetime: string
  }
  score: null | {
    host: number[]
    opponent: number[]
    final: number[]
  }
  host: {
    name: string
  }
  opponent: {
    name: string
  }
}

export interface MatchFiltered {
  schedule: {
    city: string
    datetime: string
  }
  score: null | {
    host: number[]
    opponent: number[]
    final: number[]
  }
  host: string
  opponent: string
}
