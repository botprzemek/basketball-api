import { Fund, FundQuery } from 'models/basketball/fund.model'

export const fund = (data: FundQuery): Fund => ({
	balance: data.balance,
	currency: data.currencyUnitSymbol.replace('zł', 'PLN')
})
