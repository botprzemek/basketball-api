enum State {
  STARTING = 'STARTING',
  WARMING_UP = 'WARMING_UP',
  TIMEOUT = 'TIMEOUT',
  PAUSED = 'PAUSED',
  CALL = 'CALL',
  PLAYING = 'PLAYING',
  ENDED = 'ENDED',
}

export default class GameState {
  private state: State = State.STARTING

  public isStarting(): boolean {
    return this.state === State.STARTING
  }

  public isWarmingUp(): boolean {
    return this.state === State.WARMING_UP
  }

  public isPaused(): boolean {
    return this.state === State.PAUSED
  }

  public isTimeout(): boolean {
    return this.state === State.TIMEOUT
  }

  public isCall(): boolean {
    return this.state === State.CALL
  }

  public isPlaying(): boolean {
    return this.state === State.PLAYING
  }

  public isEnded(): boolean {
    return this.state === State.ENDED
  }

  public setStarting(): GameState {
    this.state = State.STARTING
    return this
  }

  public setWarmingUp(): GameState {
    this.state = State.WARMING_UP
    return this
  }

  public setPaused(): GameState {
    this.state = State.PAUSED
    return this
  }

  public setTimeout(): GameState {
    this.state = State.TIMEOUT
    return this
  }

  public setCall(): GameState {
    this.state = State.CALL
    return this
  }

  public setPlaying(): GameState {
    this.state = State.PLAYING
    return this
  }

  public setEnd(): GameState {
    this.state = State.ENDED
    return this
  }

  public getData() {
    return this.state
  }
}
