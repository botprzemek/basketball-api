import Player from 'models/game/player.model'
import PlayerStatistics from 'models/game/statistics/playerStatistics.model'
import Team from 'models/game/team.model'
import TeamStatistics from 'models/game/statistics/teamStatistics.model'
import QuarterStatistics from 'models/game/statistics/quarterStatistics.model'
import Game from 'models/game/game.model'
import GameState from 'models/game/state/gameState.model'

export default class ScoreTable {
  private readonly team: () => Team
  private readonly game: () => Game

  constructor(team: () => Team, game: () => Game) {
    this.team = team
    this.game = game
  }

  private isAllowed(player: Player): boolean {
    const state: GameState = this.game().getState()
    return (state.isPlaying() || state.isCall()) && player.isPlaying()
  }

  public addFreethrow(player: Player, made: boolean = false): ScoreTable {
    const index: number = this.game().getTeams().indexOf(this.team())

    if (!this.isAllowed(player)) return this

    const teamStatistics: TeamStatistics = this.team().getStatistics()
    const quarterStatistics: QuarterStatistics = this.game().getQuarter().getStatistics(index)
    const playerStatistics: PlayerStatistics = this.team().getPlayer(player.getNumber()).getStatistics()

    teamStatistics
      .addFreethrow(made)
    quarterStatistics
      .addFreethrow(made)
    playerStatistics
      .addFreethrow(made)

    return this
  }
}