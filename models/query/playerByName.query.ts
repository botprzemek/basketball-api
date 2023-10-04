export interface PlayerByNameQuery {
  where: {
    OR: [
      {
        name: {
          contains: string
          mode: string
        }
      },
      {
        lastname: {
          contains: string
          mode: string
        }
      },
    ]
  }
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
  }
}
