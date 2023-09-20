import * as NodeCache from 'node-cache'
import config from '../../../configs/Default.config'

let cache = null

export default (): NodeCache => {
  if (cache) return cache
  cache = new NodeCache({ stdTTL: config.cacheTime * 1000 })
  return cache
}
