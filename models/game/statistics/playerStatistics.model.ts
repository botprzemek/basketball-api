import Statistics from 'models/game/statistics/statistics.model'

export default class PlayerStatistics extends Statistics {
  private minutes: number

  constructor() {
    super()
    this.minutes = 0
  }

  public addMinutes(): PlayerStatistics {
    this.minutes++
    return this
  }

  public getData() {
    return {
      minutes: this.minutes | 0,
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