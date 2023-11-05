import * as NodeCache from 'node-cache'
import cacheConfig from 'configs/cache.config'

let cache: NodeCache

const assign = (): any => {
  cache = new NodeCache({ stdTTL: cacheConfig.time * 1000 })
  return cache
}

export default (): NodeCache => {
  return cache ? cache : assign()
}
