import { Fund, FundQuery } from 'models/api/fund.model'

const currencies = {
	'zł': 'PLN',
}

export const fund = (data: FundQuery): Fund => ({
	balance: data.balance,
	currency: currencies[data.currencyUnitSymbol],
})

export const fundByUrl = (data: FundQuery): Fund => ({
	balance: data.balance,
	currency: currencies[data.currencyUnitSymbol],
})