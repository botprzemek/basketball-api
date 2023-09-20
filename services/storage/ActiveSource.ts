import config from '../../configs/Default.config'
import prismaQuery from 'services/storage/prisma/Prisma'

export default () => {
  return config.useSupabase ? prismaQuery : prismaQuery
}
