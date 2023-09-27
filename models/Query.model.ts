export interface PlayerSelect {
  name: string
  lastname: string
  number: number
  height: number
  position: number
  age: Date
  team: {
    league: {
      name: string
    }
    name: string
  }
}

export interface PlayerFiltered {
  name: string
  lastname: string
  number: number
  height: number
  position: number
  age: Date
  team: string
  league: string
}

export interface TeamSelect {
  name: string
  city: {
    name: string
  }
  league: {
    name: string
  }
  players: PlayerSelect[]
}

export interface TeamFiltered {
  name: string
  city: string
  league: string
  players: PlayerFiltered[]
}

export interface PlayerSelect {
  name: string
  lastname: string
  number: number
  height: number
  position: number
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
