import apiConfig from 'api.config'
import cache from 'storage/cache/Cache'
import query from 'storage/ActiveSource'

export default (): void => {
    apiConfig.routeList.forEach((route: string) => cache.setData(route, query()[route]()))
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] pulled latest data to cache`)
}