import Statistics from 'models/game/statistics/statistics.model'

export default class PlayerStatistics extends Statistics {
  private seconds: number

  constructor() {
    super()
    this.seconds = 0
  }

  public addSeconds(): PlayerStatistics {
    this.seconds++
    return this
  }

  private getMinutes(): number {
    return Math.ceil(this.seconds / 60)
  }

  public getData() {
    return {
      minutes: this.getMinutes() | 0,
      rebounds: {
        defensive: this.rebounds.defensive | 0,
        offensive: this.rebounds.offensive | 0,
      },
      assists: this.assists | 0,
      fieldGoal: {
        inside: {
          attempted: this.fieldGoal.inside.attempted | 0,
          made: this.fieldGoal.inside.made | 0,
        },
        outside: {
          attempted: this.fieldGoal.outside.attempted | 0,
          made: this.fieldGoal.outside.made | 0,
        },
      },
      freethrow: {
        attempted: this.freethrow.attempted | 0,
        made: this.freethrow.made | 0,
      },
      blocks: this.blocks | 0,
      steals: this.steals | 0,
      turnovers: this.turnovers | 0,
      fouls: this.fouls,
      eval: this.getEvaluation() | 0,
      trueShooting: this.getTrueShooting() | 0,
    }
  }
}