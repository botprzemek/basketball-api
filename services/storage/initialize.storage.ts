import prisma from './prisma/initialize.prisma'
import cache from './cache/initialize.cache'

export default (): void => {
  prisma()
  cache()
}
