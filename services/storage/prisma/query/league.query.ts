import { LeagueQuery } from 'models/query/league.model'

export default (_values?: any[]): LeagueQuery => {
  return {
    where: {},
    select: {
      name: true,
      city: true,
      teams: {
        select: {
          name: true,
          city: {
            select: {
              name: true,
            },
          },
          won: true,
          lost: true,
        },
      },
    },
  }
}
