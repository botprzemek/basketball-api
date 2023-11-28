import { Match, MatchQuery } from 'models/api/match.model'

export const matchesById = (data: MatchQuery[], [id]): Match[] =>
	data.filter((match: any): boolean => BigInt(match.id) === id)

export const matchesClosest = (data: MatchQuery[]): Match[] =>
	data
		.filter((match: any): boolean => match.timestamp > new Date().toISOString())
		.sort(
			(a: any, b: any) =>
				new Date(a.timestamp).getMilliseconds() - new Date(b.timestamp).getMilliseconds()
		)
		.splice(1)

export const matchesAfter = (data: MatchQuery[]): Match[] =>
	data.filter((match: any): boolean => new Date() < new Date(match.timestamp))

export const matchesBefore = (data: MatchQuery[]): Match[] =>
	data.filter((match: any): boolean => new Date() > new Date(match.timestamp))

export const matchesByDate = (data: MatchQuery[], [date]): Match[] =>
	data.filter(
		(match: any): boolean => date === new Date(match.timestamp).toISOString().split('T')[0]
	)

export const matchesAfterDate = (data: MatchQuery[], [date]): Match[] =>
	data.filter((match: any): boolean => new Date(date) < new Date(match.timestamp))

export const matchesBeforeDate = (data: MatchQuery[], [date]): Match[] =>
	data.filter((match: any): boolean => new Date(date) > new Date(match.timestamp))
