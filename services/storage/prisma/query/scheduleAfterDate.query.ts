import { ScheduleAfterDateQuery } from 'models/query/scheduleAfterDate.query'

export default (values: any[]): ScheduleAfterDateQuery => {
  return {
    where: {
      OR: [
        {
          datetime: {
            equals: values[0],
          },
        },
        {
          datetime: {
            gt: values[0],
          },
        },
      ],
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
