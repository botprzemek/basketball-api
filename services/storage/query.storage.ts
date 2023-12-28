import arenaInsert from 'models/insert.query'
import arenaUpdate from 'models/update/arena.update'

export default {
	insert: {
		arenas: arenaInsert
	},
	update: {
		arenas: arenaUpdate
	}
}
