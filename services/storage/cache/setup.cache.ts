import config from 'config'
import cache from 'services/cache.service'
import storage from 'services/storage.service'

export default async (): Promise<void> => {
  for (const route of config.routeList) cache.setData(route, await storage[route]())
}
