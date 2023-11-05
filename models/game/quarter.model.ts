import QuarterStatistics from 'models/game/statistics/quarterStatistics.model'

export default class Quarter {
  private active: boolean
  private readonly statistics: QuarterStatistics[]

  constructor() {
    this.active = false
    this.statistics = [
      new QuarterStatistics(),
      new QuarterStatistics()
    ]
  }

  public isActive(): boolean {
    return this.active
  }

  public changeActive(): Quarter {
    this.active = !this.active
    return this
  }

  public getStatistics(index: number): QuarterStatistics {
    return this.statistics[index]
  }

  public getData() {
    return {
      active: this.active,
      statistics: this.statistics.map((statistics: QuarterStatistics) => statistics.getData()),
    }
  }
}