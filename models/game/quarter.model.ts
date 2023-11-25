import Team from 'models/game/team.model'
import QuarterStatistics from 'models/game/statistics/quarterStatistics.model'
import Timer from 'models/game/timer.model'

export default class Quarter {
	private readonly number: number
	private active: boolean
	private readonly timer: Timer
	private readonly teams: Team[]
	private readonly statistics: QuarterStatistics[]

	constructor(number: number, ...teams: Team[]) {
		this.number = number
		this.active = false
		this.timer = new Timer()
		this.teams = teams
		this.statistics = [new QuarterStatistics(), new QuarterStatistics()]
	}

	public isActive(): boolean {
		return this.active
	}

	public changeActive(): Quarter {
		this.active = !this.active
		return this
	}

	public getNumber(): number {
		return this.number
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
			statistics: this.statistics.map((quarterStatistics: QuarterStatistics) =>
				quarterStatistics.getData()
			)
		}
	}
}
