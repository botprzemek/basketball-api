import {LeagueQuery} from 'models/query/league.query'

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
          league: {
            select: {
              name: true,
            },
          },
          players: {
            select: {
              name: true,
              lastname: true,
              number: true,
              height: true,
              position: true,
              age: true,
            },
          },
        },
      }
    },
  }
}
