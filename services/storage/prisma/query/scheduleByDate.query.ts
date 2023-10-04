import { ScheduleByDateQuery } from 'models/query/scheduleByDate.query'

export default (values: any[]): ScheduleByDateQuery => {
  return {
    where: {
      datetime: {
        gt: values[0],
        lt: values[1],
      },
    },
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
