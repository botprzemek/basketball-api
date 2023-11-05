import Team from 'models/game/team.model'
import QuarterStatistics from 'models/game/statistics/quarterStatistics.model'
import Timer from 'models/game/time.model'

export default class Quarter {
  private active: boolean
  private readonly timer: Timer
  private readonly teams: Team[]
  private readonly statistics: QuarterStatistics[]

  constructor(...teams: Team[]) {
    this.active = false
    this.timer = new Timer()
    this.teams = teams
    this.statistics = [
      new QuarterStatistics(),
      new QuarterStatistics(),
    ]
  }

  public isActive(): boolean {
    return this.active
  }

  public changeActive(): Quarter {
    this.active = !this.active
    return this
  }

  public getTimer(): Timer {
    return this.timer
  }

  public getQuarterStatistics(team: Team): QuarterStatistics {
    return this.statistics[this.teams.indexOf(team)]
  }

  public getData() {
    return {
      active: this.active,
      statistics: this.statistics.map((quarterStatistics: QuarterStatistics) => quarterStatistics.getData())
    }
  }
}