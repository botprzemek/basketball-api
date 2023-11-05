import Quarter from 'models/game/quarter.model'
import Team from 'models/game/team.model'
import GameState from 'models/game/state/gameState.model'

export default class Game {
  private readonly state: GameState
  private readonly quarters: Quarter[]
  private host: Team
  private opponent: Team

  constructor() {
    this.state = new GameState()
    this.quarters = []
  }

  public addHost(host: Team): Team {
    this.host = host.setStatistics(this)
    return this.host
  }

  public addOpponent(opponent: Team): Team {
    this.opponent = opponent.setStatistics(this)
    return this.opponent
  }

  private setQuarter(number: number): Game {
    this.quarters[number - 1].changeActive()
    return this
  }

  public getState(): GameState {
    return this.state
  }

  public getQuarter(): Quarter {
    return this.quarters
      .filter((quarter: Quarter) => quarter.isActive())[0]
  }

  public getQuarters(): Quarter[] {
    return this.quarters
  }

  public getHost(): Team {
    return this.host
  }

  public getOpponent(): Team {
    return this.opponent
  }

  public getOpposingTeam(team: Team): Team {
    return (team !== this.host) ? this.host : this.opponent
  }

  public getTeams(): Team[] {
    return [
      this.host,
      this.opponent
    ]
  }

  public nextQuarter(): Game {
    if (this.state.isEnded()) return this

    if (this.quarters.indexOf(this.getQuarter()) === 3) {
      this.end()
      return this
    }

    this.quarters
      .filter((quarter: Quarter) => quarter.isActive())
      .map((quarter: Quarter): void => {
        quarter.changeActive()
        this.quarters[this.quarters.indexOf(quarter) + 1].changeActive()
      })

    return this
  }

  public start(): Game {
    this.state.setPlaying()
    for (let i: number = 0; i < 4; i++) {
      this.quarters[i] = new Quarter(this.getHost(), this.getOpponent())
    }
    this.setQuarter(1)
    this.getQuarter().getTimer().start(this)
    return this
  }

  public end(): void {
    this.state.setEnd()
    this.getQuarters().map((quarter: Quarter) => quarter.getTimer().stop())
    this.getQuarter().changeActive()
  }

  public getData() {
    return {
      state: this.state.getData(),
      teams: {
        host: this.host.getData(),
        opponent:  this.opponent.getData(),
      },
      // quarters: this.quarters.map((quarter: Quarter) => quarter.getData())
    }
  }
}