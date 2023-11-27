// TODO

export const matchesById = (data: any[], [id]): any[] =>
	data.filter((match: any): boolean => BigInt(match.id) === id)

export const matchesByClosest = (data: any[]): any[] =>
	data
		.filter((match: any): boolean => match.timestamp > new Date().toISOString())
		.sort(
			(a: any, b: any) =>
				new Date(a.timestamp).getMilliseconds() - new Date(b.timestamp).getMilliseconds()
		)
		.splice(1)

export const matchesByDate = (data: any[], [date]): any[] =>
	data.filter(
		(match: any): boolean => date === new Date(match.datetime).toISOString().split('T')[0]
	)

export const matchesAfterDate = (data: any[], [date]): any[] =>
	data.filter((match: any): boolean => new Date(date) < new Date(match.datetime))

export const matchesBeforeDate = (data: any[], [date]): any[] =>
	data.filter((match: any): boolean => new Date(date) > new Date(match.datetime))
