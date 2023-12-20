import arenaInsert from 'models/insert/arena.insert'
import arenaUpdate from 'models/update/arena.update'
import arenaDelete from 'models/delete/arena.delete'

export default {
	insert: {
		arenas: arenaInsert
	},
	update: {
		arenas: arenaUpdate
	},
	delete: {
		arenas: arenaDelete
	}
}
