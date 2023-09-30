export default (_values?: any[]) => {
  return {
    where: {},
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
}
