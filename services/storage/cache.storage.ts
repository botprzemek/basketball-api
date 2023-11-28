import * as NodeCache from 'node-cache'
import cacheConfig from 'configs/cache.config'
import setupCache from 'services/storage/cache/setup.cache'

let cache: NodeCache

const assign = (): NodeCache => {
	cache = new NodeCache({ stdTTL: cacheConfig.time * 1000 })
	setupCache()
	return cache
}

export const setData = (key: string, value: any): any => {
	if (!value) return []
	initialize().set(key, value)
	return value
}

export const getData = (key: string): any => {
	return initialize().get(key)
}

export const initialize = (): NodeCache => {
	return cache ? cache : assign()
}
