import arenaInsert from 'services/storage/query/insert/arena.insert'
import arenaUpdate from 'services/storage/query/update/arena.update'
import arenaSelect from 'services/storage/query/select/arena.select'
import arenaDelete from 'services/storage/query/delete/arena.delete'

export default {
	insert: {
		arenas: arenaInsert
	},
	update: {
		arenas: arenaUpdate
	},
	select: {
		arenas: arenaSelect
	},
	delete: {
		arenas: arenaDelete
	}
}
