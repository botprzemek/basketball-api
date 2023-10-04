import { MatchByDateQuery } from 'models/query/matchByDate.query'

export default (values: any[]): MatchByDateQuery => {
  return {
    where: {
      schedule: {
        datetime: {
          gt: values[0],
          lt: values[1],
        },
      },
    },
    select: {
      schedule: {
        select: {
          city: true,
          datetime: true,
        },
      },
      score: {
        select: {
          host: true,
          opponent: true,
        },
      },
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
  }
}
