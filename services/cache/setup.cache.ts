import storageService from 'services/storage.service'
import routes from 'utils/route.util'
import defaultConfig from 'configs/default.config'

export default async (): Promise<void> => {
	if (!defaultConfig.useCache) return
	for (const key of Object.keys(routes)) await storageService[key].get()
}
