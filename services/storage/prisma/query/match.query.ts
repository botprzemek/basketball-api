export default (_values?: any[]) => {
  return {
    where: {},
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
