import Player from 'models/game/player.model'
import Foul from 'models/game/type/foul.enum'

export default class Call {
	private readonly player: Player
	private readonly opponent: Player
	private readonly type: Foul

	constructor(player: Player, opponent: Player, type: Foul) {
		this.player = player
		this.opponent = opponent
		this.type = type
	}

	getPlayer(): Player {
		return this.player
	}

	getOpponent(): Player {
		return this.opponent
	}

	getType(): Foul {
		return this.type
	}
}
