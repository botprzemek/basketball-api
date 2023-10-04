export interface ScheduleQuery {
  where: {}
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
