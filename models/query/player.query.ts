export interface PlayerQuery {
  where: {}
  select: {
    name: boolean
    lastname: boolean
    number: boolean
    height: boolean
    position: boolean
    age: boolean
    team: {
      select: {
        league: {
          select: {
            name: boolean
          }
        }
        name: boolean
      }
    }
    statistics: boolean
  }
}
