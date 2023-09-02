import * as NodeCache from 'node-cache'
import apiConfig from 'api.config'

let cache = null

const initializeCache = (): NodeCache => {
    cache = new NodeCache({stdTTL: apiConfig.cacheTime * 1000})
    return cache
}

export default function (): NodeCache {
    return cache
        ? cache
        : initializeCache()
}