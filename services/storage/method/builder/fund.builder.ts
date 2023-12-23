import { Fund, FundQuery } from 'types/basketball/fund.model'

export default (data: FundQuery): Fund => ({
	balance: data.balance,
	currency: data.currencyUnitSymbol.replace('zł', 'PLN')
})
