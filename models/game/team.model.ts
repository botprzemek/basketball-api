import Player from 'models/game/player.model'
import Game from 'models/game/game.model'
import StatisticsManager from 'models/game/statistics.manager'

export default class Team {
  private readonly name: string
  private readonly players: Player[]
  private statistics: StatisticsManager

  constructor(name: string) {
    this.name = name
    this.players = []
  }

  public addPlayer(player: Player): Team {
    this.players.push(player)
    return this
  }

  public setStartingFive(...numbers: number[]): void {
    this.players.map((player: Player) => player.getState().setBenched())
    numbers.map((number: number) => this.getPlayer(number).getState().setPlaying())
  }

  public setStatistics(game: Game): Team {
    this.statistics = new StatisticsManager(this, game)
    return this
  }

  public getPlayer(number: number): Player {
    return this.players
      .filter((player: Player): boolean => player.getNumber() === number)[0]
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
      // statistics: this.getStatistics().getData()
    }
  }
}