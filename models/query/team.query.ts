export interface TeamQuery {
  where: {}
  select: {
    name: boolean
    city: {
      select: {
        name: boolean
      }
    }
    league: {
      select: {
        name: boolean
      }
    }
    players: {
      select: {
        name: boolean
        lastname: boolean
        number: boolean
        height: boolean
        position: boolean
        age: boolean
      }
    }
  }
}
