import QueryEnum from 'types/storage/query.enum'

export default (query: QueryEnum, data: any[], parameter: string): any[] =>
	data.filter((element): boolean => {
		const value: any = element[query.toLowerCase()]
		switch (query) {
			case QueryEnum.ID:
			case QueryEnum.CITY_ID:
			case QueryEnum.LEAGUE_ID:
			case QueryEnum.TEAM_ID: {
				return BigInt(value) === BigInt(parameter)
			}
			case QueryEnum.NAME:
			case QueryEnum.LAST_NAME:
			case QueryEnum.TEAM_NAME:
			case QueryEnum.LOCATION: {
				return value.includes(parameter) || value === parameter || parameter.includes(value)
			}
			case QueryEnum.WON:
			case QueryEnum.LOST: {
				return Number(value) === Number(parameter)
			}
			default: {
				return element
			}
		}
	})
