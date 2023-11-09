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

  public substitution(substituteNumber: number, changerNumber: number) {
    const substitute: Player = this.getPlayer(substituteNumber)
    const changer: Player = this.getPlayer(changerNumber)

    if (substitute.getState().isPlaying() && !changer.getState().isPlaying()) {
      substitute.getState().setBenched()
      changer.getState().setPlaying()
    }

    return {
      substitute: substitute,
      changer: changer,
    }
  }

  public addPlayer(player: Player): Team {
    this.players.push(player)
    return this
  }

  public setStartingFive(...numbers: number[]): void {
    this.players.map((player: Player) => player.getState().setBenched())
    numbers.map((number: number): void => {
      const player: Player = this.getPlayer(number)

      if (!player) return
      player.getState().setStarting()
    })
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
