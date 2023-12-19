import arenaInsert from '../../models/insert/arena.insert'
import arenaUpdate from '../../models/update/arena.update'
import arenaSelect from '../../models/select/arena.select'
import arenaDelete from '../../models/delete/arena.delete'

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
