export interface FundQuery {
	readonly balance: number
	readonly currencyUnitSymbol: string
}

export interface Fund {
	balance: number
	currency: string
}
