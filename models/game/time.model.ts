import Game from 'models/game/game.model'
import Team from "models/game/team.model";
import Player from "models/game/player.model";

export default class Timer {
  private time: number
  private timer: NodeJS.Timeout

  constructor() {
    this.time = 0
  }

  private createTimer(game: Game): Timer {
    this.timer = setInterval(() => this.addTime(game), 1000)
    return this
  }

  private addTime(game: Game): Timer {
    this.time++
    game.getTeams().map((team: Team): void => {
      team.getPlayers()
        .filter((player: Player) => player.getState().isPlaying())
        .map((player: Player) => player.getStatistics().addSeconds())
    })
    return this
  }

  public start(game: Game): Timer {
    this.createTimer(game)
    return this
  }

  public stop(): Timer {
    clearInterval(this.timer)
    return this
  }
}