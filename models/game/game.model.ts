import Quarter from 'models/game/quarter.model'
import Team from 'models/game/team.model'
import GameState from 'models/game/state/gameState.model'

export default class Game {
  private readonly state: GameState
  private readonly teams: Team[]
  private readonly quarters: Quarter[]

  constructor() {
    this.state = new GameState()
    this.teams = []
    this.quarters = [
      new Quarter(),
      new Quarter(),
      new Quarter(),
      new Quarter(),
    ]
  }

  public addTeam(team: Team): Game {
    this.teams.push(team)
    return this
  }

  setQuarter(number: number): Game {
    this.quarters[number - 1]
      .changeActive()
    return this
  }

  public getState(): GameState {
    return this.state
  }

  public getQuarter(): Quarter {
    return this.quarters
      .filter((quarter: Quarter) => quarter.isActive())[0]
  }

  public getTeams(): Team[] {
    return this.teams
  }

  public nextQuarter(): Game {
    if (this.state.isEnded()) return this
    this.quarters
      .filter((quarter: Quarter, index: number) => {
        if (index === this.quarters.length - 1) return this.end()
        quarter.isActive()
      })
      .map((quarter: Quarter, index: number): void => {
        this.quarters[index + 1]
          .changeActive()
        quarter
          .changeActive()
      })

    return this
  }

  public end(): void {
    this.state
      .setEnd()
    this.getQuarter()
      .changeActive()
  }

  public getData() {
    return {
      state: this.state.getData(),
      teams: this.teams.map((team: Team) => team.getData()),
      quarters: this.quarters.map((quarter: Quarter) => quarter.getData())
    }
  }
}