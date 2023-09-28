import {PrismaClient} from '@prisma/client'
import {withAccelerate} from '@prisma/extension-accelerate'
import setupCache from 'services/storage/cache/setup.cache'
import {PrismaClientKnownRequestError} from '@prisma/client/runtime/library'

let prisma: any

export default (): any => {
  if (prisma) return prisma
  prisma = new PrismaClient().$extends(withAccelerate())
  try {
    prisma.league.findFirst()
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P5006') {
      console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] unable to connect to database (check your configuration)`)
      process.exit(0)
    }
  } finally {
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] connected to database`)
    setupCache().then((): void => console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] pulled latest data to cache`))
  }
  return prisma
}
