import config from 'Config'
import cache from 'services/storage/cache/Cache'
import storage from 'services/Storage'

export default async (): Promise<void> => {
  for (const route of config.routeList) cache.setData(route, await storage[route]())
  console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] pulled latest data to cache`)
}
