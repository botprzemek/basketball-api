import PlayerState from 'types/game/state/playerState.model'
import PlayerStatistics from 'types/game/statistics/playerStatistics.model'
import PositionType from 'types/basketball/enum/position.enum'

export default class Player {
	private readonly name: string
	private readonly lastname: string
	private readonly number: number
	private readonly position: PositionType
	private readonly starter: boolean
	private readonly state: PlayerState
	private readonly statistics: PlayerStatistics

	constructor(
		name: string,
		lastname: string,
		number: number,
		position: PositionType,
		starter?: boolean
	) {
		this.name = name
		this.lastname = lastname
		this.number = number
		this.position = position
		this.starter = starter || false
		this.state = new PlayerState()
		this.statistics = new PlayerStatistics()
	}

	public isStarter(): boolean {
		return this.starter
	}

	public getName(): string {
		return this.name
	}

	public getLastname(): string {
		return this.lastname
	}

	public getNumber(): number {
		return this.number
	}

	public getState(): PlayerState {
		return this.state
	}

	public getStatistics(): PlayerStatistics {
		return this.statistics
	}

	public getData() {
		return {
			name: this.name,
			lastname: this.lastname,
			number: this.number,
			position: this.position,
			state: this.state.getData(),
			statistics: this.statistics.getData()
		}
	}
}
