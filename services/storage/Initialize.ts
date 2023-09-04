import prisma from './prisma/Initialize'
import cache from './cache/Initialize'

export default (): void => {
    prisma()
    cache()
}