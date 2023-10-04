export interface ScheduleAfterDateQuery {
  where: {
    OR: [
      {
        datetime: {
          equals: Date
        }
      },
      {
        datetime: {
          gt: Date
        }
      },
    ]
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
