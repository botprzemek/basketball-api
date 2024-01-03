import {Player, PlayerQuery} from 'types/basketball/player.model'
import PositionEnum from 'types/basketball/enum/position.enum'

export default {
  players: (data: PlayerQuery): Player => {
    const { birthday, number, position, height, ...player } = data
    return {
      ...player,
      number: Number(number),
      position: position as PositionEnum,
      height: Number(height),
      age: new Date().getFullYear() - new Date(birthday).getFullYear()
    }
  }
}