import Player from 'models/game/player.model'
import TeamStatistics from 'models/game/statistics/teamStatistics.model'
import Game from 'models/game/game.model'
import ScoreTable from 'models/game/scoreTable.model'

export default class Team{
  private readonly name: string
  private readonly players: Player[]
  private readonly statistics: TeamStatistics
  private readonly scoreTable: ScoreTable

  constructor(name: string, game: () => Game) {
    this.name = name
    this.players = []
    this.statistics = new TeamStatistics()
    this.scoreTable = new ScoreTable(() => this, game)
  }

  public addPlayer(player: Player): Team {
    this.players.push(player)
    return this
  }

  public setStartingFive(...players: Player[]): void {
    this.players
      .filter((player: Player): boolean => players.includes(player))
      .map((player: Player) => player.setPlaying())
  }

  public getPlayer(number: number): Player {
    return this.players
      .filter((player: Player): boolean => player.getNumber() === number)[0]
  }

  public getStatistics(): TeamStatistics {
    return this.statistics
  }

  public getScore(): ScoreTable {
    return this.scoreTable
  }

  public getData() {
    return {
      name: this.name,
      players: this.players.map((player: Player) => player.getData()),
      statistics: this.statistics.getData(),
    }
  }
}