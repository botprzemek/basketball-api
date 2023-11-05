import Player from 'models/game/player.model'
import FoulType from 'models/game/type/foul.model'

export default class Call {
  private readonly player: Player
  private readonly opponent: Player
  private readonly type: FoulType

  constructor(player: Player, opponent: Player, type: FoulType) {
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

  getType(): FoulType {
    return this.type
  }
}