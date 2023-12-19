export default class Statistics {
	protected rebounds: {
		defensive: number
		offensive: number
	}
	protected assists: number
	protected fieldGoal: {
		inside: {
			attempted: number
			made: number
		}
		outside: {
			attempted: number
			made: number
		}
	}
	protected freethrow: {
		attempted: number
		made: number
	}
	protected blocks: number
	protected steals: number
	protected turnovers: number
	protected fouls: number

	constructor() {
		this.rebounds = {
			defensive: 0,
			offensive: 0
		}
		this.assists = 0
		this.fieldGoal = {
			inside: {
				attempted: 0,
				made: 0
			},
			outside: {
				attempted: 0,
				made: 0
			}
		}
		this.freethrow = {
			attempted: 0,
			made: 0
		}
		this.blocks = 0
		this.steals = 0
		this.turnovers = 0
		this.fouls = 0
	}

	public addDefensiveRebound(): Statistics {
		this.rebounds.defensive++
		return this
	}

	public addOffensiveRebound(): Statistics {
		this.rebounds.offensive++
		return this
	}

	public addInsideFG(made: boolean = false): Statistics {
		this.fieldGoal.inside.attempted++
		if (!made) return this

		this.fieldGoal.inside.made++

		return this
	}

	public addOutsideFG(made: boolean = false): Statistics {
		this.fieldGoal.outside.attempted++
		if (!made) return this

		this.fieldGoal.outside.made++

		return this
	}

	public addFreethrow(made: boolean = false): Statistics {
		this.freethrow.attempted++
		if (!made) return this

		this.freethrow.made++

		return this
	}

	public addFoul(): Statistics {
		this.fouls++
		return this
	}

	private getPoints(): number {
		return (
			this.fieldGoal.outside.made * 3 + this.fieldGoal.inside.made * 2 + this.freethrow.made
		)
	}

	public getRebounds(): number {
		return this.rebounds.defensive + this.rebounds.offensive
	}

	public getAssists(): number {
		return this.assists
	}

	private getAttempedFG(): number {
		return this.fieldGoal.inside.attempted + this.fieldGoal.outside.attempted
	}

	private getMadeFG(): number {
		return this.fieldGoal.inside.made + this.fieldGoal.outside.made
	}

	public getFouls(): number {
		return this.fouls
	}

	public getEvaluation(): number {
		const reboundsSum: number = this.rebounds.defensive + this.rebounds.offensive
		const missedFG: number =
			this.getAttempedFG() +
			this.freethrow.attempted -
			(this.getMadeFG() + this.freethrow.made)
		return (
			this.getPoints() +
			reboundsSum +
			this.assists +
			this.steals +
			this.blocks -
			(missedFG + this.turnovers)
		)
	}

	public getTrueShooting(): number {
		return Math.ceil(
			(this.getPoints() / (2 * (this.getAttempedFG() + 0.44 * this.freethrow.attempted))) *
				100
		)
	}

	public getData() {
		return {
			rebounds: {
				defensive: this.rebounds.defensive | 0,
				offensive: this.rebounds.offensive | 0
			},
			assists: this.assists | 0,
			fieldGoal: {
				inside: {
					attempted: this.fieldGoal.inside.attempted | 0,
					made: this.fieldGoal.inside.made | 0
				},
				outside: {
					attempted: this.fieldGoal.outside.attempted | 0,
					made: this.fieldGoal.outside.made | 0
				}
			},
			freethrow: {
				attempted: this.freethrow.attempted | 0,
				made: this.freethrow.made | 0
			},
			blocks: this.blocks | 0,
			steals: this.steals | 0,
			turnovers: this.turnovers | 0,
			fouls: this.fouls,
			eval: this.getEvaluation() | 0,
			trueShooting: this.getTrueShooting() | 0
		}
	}
}
