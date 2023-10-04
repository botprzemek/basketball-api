import { ScheduleBeforeDateQuery } from 'models/query/scheduleBeforeDate.query'

export default (values: any[]): ScheduleBeforeDateQuery => {
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
            lt: values[0],
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
