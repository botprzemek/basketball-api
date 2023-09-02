import apiConfig from 'api.config'
import prismaQuery from 'storage/prisma/Prisma'

export default function () {
    return apiConfig.useSupabase ? prismaQuery : prismaQuery
}