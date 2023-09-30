export default (values: any[]) => {
  return {
    where: {
      name: {
        equals: values[0],
        mode: 'insensitive',
      },
    },
    select: {
      name: true,
      city: true,
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
