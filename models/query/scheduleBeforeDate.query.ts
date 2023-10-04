export interface ScheduleBeforeDateQuery {
  where: {
    OR: [
      {
        datetime: {
          equals: Date
        }
      },
      {
        datetime: {
          lt: Date
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
