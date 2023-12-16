import { FundQuery } from 'models/basketball/fund.model'

export const fundByUrl = (data: FundQuery[]): FundQuery[] =>
	data.filter((fund: FundQuery): boolean => !!fund)
