import storageService from './storage.service'
import QueryEnum from 'models/storage/query.enum'

const test = async () => {
	const arenas = await storageService.arenas.get()
	console.log(arenas)
	const arenasById = await storageService.arenas.get(QueryEnum.ID, arenas.at(0).id)
	console.log(arenasById)
	process.exit(0)
}

test()