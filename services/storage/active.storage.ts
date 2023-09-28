import config from 'config'
import prismaQuery from 'services/storage/prisma/query.prisma'

export default () => {
  return config.useSupabase ? prismaQuery : prismaQuery
}
