import { Fund, FundQuery } from 'models/api/fund.model'

export const fund = (data: FundQuery): Fund => ({
	balance: data.balance,
	currency: data.currencyUnitSymbol.replace('zł', 'PLN')
})

export const fundByUrl = (data: FundQuery): Fund => ({
	balance: data.balance,
	currency: data.currencyUnitSymbol.replace('zł', 'PLN')
})
