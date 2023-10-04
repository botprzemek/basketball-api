export interface ScheduleByDateQuery {
  where: {
    datetime: {
      gt: Date
      lt: Date
    }
  }
  select: {
    city: boolean
    datetime: boolean
    match: {
      select: {
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
  }
}
