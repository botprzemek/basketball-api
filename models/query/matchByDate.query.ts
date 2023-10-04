export interface MatchByDateQuery {
  where: {
    schedule: {
      datetime: {
        gt: Date
        lt: Date
      }
    }
  }
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
        name: boolean
      }
    }
    opponent: {
      select: {
        name: boolean
      }
    }
  }
}
