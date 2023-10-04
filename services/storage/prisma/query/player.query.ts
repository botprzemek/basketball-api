import { PlayerQuery } from 'models/query/player.query'

export default (_values?: any[]): PlayerQuery => {
  return {
    where: {},
    select: {
      name: true,
      lastname: true,
      number: true,
      height: true,
      position: true,
      age: true,
      team: {
        select: {
          league: {
            select: {
              name: true,
            },
          },
          name: true,
        },
      },
    },
  }
}
