interface PlayerQuery {
  where: {}
  select: {
    name: boolean
    lastname: boolean
    number: boolean
    height: boolean
    position: boolean
    age: boolean
    team: {
      select: {
        league: {
          select: {
            name: boolean
          }
        }
        name: boolean
      }
    }
  }
}

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
