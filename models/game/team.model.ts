import Player from 'models/game/player.model'
import Game from 'models/game/game.model'
import StatisticsManager from 'models/game/statistics/statistics.manager'

export default class Team {
  private readonly name: string
  private readonly players: Player[]
  private statistics: StatisticsManager

  constructor(name: string) {
    this.name = name
    this.players = []
  }

  public substitution(substitute: Player, changer: Player): boolean {
    if (!substitute.getState().isPlaying() || changer.getState().isPlaying()) return false

    substitute.getState().setBenched()
    changer.getState().setPlaying()

    return true
  }

  public addPlayer(player: Player): Team {
    this.players.push(player)
    return this
  }

  public setStartingFive(): void {
    this.players
      .map((player: Player) => {
        player.getState().setWarmingUp()
        return player
      })
      .filter((player: Player): boolean => player.isStarter())
      .map((player: Player) => player.getState().setStarting())
  }

  public setStatistics(game: Game): Team {
    this.statistics = new StatisticsManager(this, game)
    return this
  }

  public getName(): string {
    return this.name
  }

  public getPlayer(number: number): Player {
    return this.players.filter((player: Player): boolean => player.getNumber() === number)[0]
  }

  public getPlayers(): Player[] {
    return this.players
  }

  public getStatistics(): StatisticsManager {
    return this.statistics
  }

  public getData() {
    return {
      name: this.name,
      players: this.players.map((player: Player) => player.getData()),
      statistics: this.getStatistics().getData(),
    }
  }
}
