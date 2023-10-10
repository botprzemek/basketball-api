export interface MatchQuery {
  where: {}
  select: {
    schedule: {
      select: {
        city: boolean
        datetime: boolean
      }
    }
    score: {
      select: {
        host: boolean
        opponent: boolean
      }
    }
    host: {
      select: {
        id: boolean
        name: boolean
      }
    }
    opponent: {
      select: {
        id: boolean
        name: boolean
      }
    }
    rosters: {
      include: {
        players: {
          select: {
            name: boolean
            lastname: boolean
            number: boolean
          }
        }
      }
    }
    // rosters: {
    //   select: {
    // }
  }
}
