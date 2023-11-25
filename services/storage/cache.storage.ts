import * as NodeCache from 'node-cache'
import cacheConfig from 'configs/cache.config'

let cache: NodeCache

const assign = (): any => {
	cache = new NodeCache({ stdTTL: cacheConfig.time * 1000 })
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
