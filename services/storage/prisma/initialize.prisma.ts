import setupCache from 'services/storage/cache/setup.cache'
import getPrisma from 'services/storage/prisma.storage'

export default async (): Promise<any> => {
  const prisma = getPrisma()

  if (!prisma) return

  try {
    await prisma.$queryRaw`SELECT * FROM leagues WHERE 1 = 0`
  } catch (error) {
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] unable to connect to database (check your configuration)`)

    process.exit(0)
  } finally {
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] connected to database`)

    setupCache().then((): void => {
      console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] pulled latest data to cache`)
    })
  }
  return
}
