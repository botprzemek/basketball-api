export type MatchSelect = {
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

export type MatchFiltered = {
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
