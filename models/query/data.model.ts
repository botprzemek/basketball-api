export interface PlayerSelected {
  name: string
  lastname: string
  number: number
  height: number
  position: number
  age: Date
}

export interface PlayerFiltered {
  name: string
  lastname: string
  number: number
  height: number
  position: number
  age: Date
}

export interface TeamSelected {
  name: string
  won: number
  lost: number
  city: {
    name: string
  }
  league: {
    name: string
  }
  players: PlayerSelected[]
}

export interface TeamFiltered {
  name: string
  won: number
  lost: number
  city: string
  league: string
  players: PlayerFiltered[]
}

export interface MatchSelected {
  schedule: {
    city: {
      id: number
      name: string
      state: string
    }
    datetime: string
  }
  score: {
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
  score: {
    host: number[]
    opponent: number[]
    final: number[]
  }
  host: string
  opponent: string
}

export interface ScheduleSelected {
  city: {
    id: number
    name: string
    state: string
  }
  datetime: Date
  match: {
    host: {
      name: string
    }
    opponent: {
      name: string
    }
  }
}

export interface ScheduleFiltered {
  city: string
  datetime: Date
  match: {
    host: string
    opponent: string
  }
}
