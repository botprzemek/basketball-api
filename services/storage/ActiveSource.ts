import config from 'Config'
import prismaQuery from 'services/storage/prisma/Prisma'

export default () => {
  return config.useSupabase ? prismaQuery : prismaQuery
}
