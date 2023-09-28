import config from 'config'
import prismaQuery from 'services/storage/prisma.storage'

export default () => {
  return config.useSupabase ? prismaQuery : prismaQuery
}
