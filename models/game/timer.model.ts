import gameConfig from 'configs/game.config'
import Game from 'models/game/game.model'

export default class Timer {
  private time: number
  private timer?: NodeJS.Timeout

  constructor() {
    this.time = gameConfig.time
  }

  private createTimer(game: Game): Timer {
    this.timer = setInterval((): void => {
      if (!this.time) return
      if (game.getState().isPlaying()) {
        this.addTime()
        return
      }
      this.stop()
    }, 1000)
    return this
  }

  private addTime(): Timer {
    this.time--
    return this
  }

  public start(game: Game): Timer {
    if (!this.timer) this.createTimer(game)
    return this
  }

  public stop(): Timer {
    clearInterval(this.timer)
    delete this.timer
    return this
  }

  public getTime(): number {
    return this.time
  }
}
