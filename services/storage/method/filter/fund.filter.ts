import { FundQuery } from 'models/api/fund.model'

export const fundByUrl = (data: FundQuery[], []): FundQuery[] =>
	data.filter((fund: FundQuery): boolean => true)