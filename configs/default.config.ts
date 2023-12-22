import Compression from 'types/compression.enum'

export default {
	name: 'Knury Knurów',
	email: 'info@knuryknurow.pl',
	fund: 'https://zrzutka.pl/sm74bt/data.json',
	useApiKey: true,
	useCompression: Compression.GZIP,
	useCache: true,
	cacheTime: 1800,
	authTime: '1d'
}
