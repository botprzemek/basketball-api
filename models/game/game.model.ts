import Quarter from 'models/game/quarter.model'
import Team from 'models/game/team.model'
import GameState from 'models/game/state/gameState.model'

export default class Game {
  private readonly state: GameState
  private readonly quarters: Quarter[]
  private readonly teams: Team[]

  constructor() {
    this.state = new GameState()
    this.quarters = []
    this.teams = []
  }

  public addTeam(team: Team): Team {
    this.teams.push(team.setStatistics(this))
    return team
  }

  private setQuarter(number: number): Game {
    this.quarters[number - 1].changeActive()
    return this
  }

  public getState(): GameState {
    return this.state
  }

  public getQuarter(): Quarter {
    return this.quarters.filter((quarter: Quarter) => quarter.isActive())[0]
  }

  public getQuarters(): Quarter[] {
    return this.quarters
  }

  public getOpposingTeam(team: Team): Team {
    return this.teams.filter((filtering: Team) => team !== filtering)[0]
  }

  public getTeams(): Team[] {
    return this.teams
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
        quarter.getTimer().stop()

        const nextQuarter: Quarter = this.quarters[this.quarters.indexOf(quarter) + 1]

        nextQuarter.changeActive()
        nextQuarter.getTimer().start(this)

        this.getState().setPaused()
      })

    return this
  }

  public start(): Game {
    this.state.setWarmingUp()
    for (let i: number = 0; i < 4; i++) {
      this.quarters[i] = new Quarter(i + 1, this.teams[0], this.teams[1])
    }
    this.setQuarter(1)
    return this
  }

  public end(): void {
    this.state.setEnd()
    this.getQuarter().changeActive()
  }

  public getEssentialData() {
    return {
      state: this.state.getData(),
      quarter: this.getQuarter(),
      teams: this.getTeams().map((team: Team) => {
        return {
          name: team.getName(),
          statistics: team.getStatistics().getData(),
        }
      }),
    }
  }

  public getData() {
    return {
      state: this.state.getData(),
      teams: this.teams.map((team: Team) => team.getData()),
      quarters: this.quarters.map((quarter: Quarter) => quarter.getData()),
    }
  }
}
