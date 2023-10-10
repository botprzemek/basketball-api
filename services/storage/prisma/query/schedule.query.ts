import { ScheduleQuery } from 'models/query/schedule.query'

export default (_values?: any[]): ScheduleQuery => {
  return {
    where: {},
    select: {
      city: true,
      datetime: true,
      match: {
        select: {
          host: {
            select: {
              name: true,
            },
          },
          opponent: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  }
}