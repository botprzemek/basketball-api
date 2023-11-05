import PlayerState from 'models/game/state/playerState.model'
import PlayerStatistics from 'models/game/statistics/playerStatistics.model'
import Position from 'models/game/position.model'

export default class Player {
  private readonly name: string
  private readonly lastname: string
  private readonly number: number
  private readonly position: Position
  private state: PlayerState
  private readonly statistics: PlayerStatistics

  constructor(name: string, lastname: string, number: number, position: Position) {
    this.name = name
    this.lastname = lastname
    this.number = number
    this.position = position
    this.state = PlayerState.WARMING_UP
    this.statistics = new PlayerStatistics()
  }

  public isPlaying(): boolean {
    return this.getState() === PlayerState.PLAYING
  }

  public setPlaying(): Player {
    if (this.state !== PlayerState.PLAYING) this.state = PlayerState.PLAYING
    return this
  }

  public getNumber(): number {
    return this.number
  }

  public getState(): PlayerState {
    return this.state
  }

  public getStatistics(): PlayerStatistics {
    return this.statistics
  }

  public getData() {
    return {
      name: this.name,
      lastname: this.lastname,
      number: this.number,
      position: this.position,
      state: this.state,
      statistics: this.statistics.getData(),
    }
  }
}