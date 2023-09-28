export default {
  name: 'Knury Knurów',
  email: 'info@knuryknurow.pl',
  useSecret: true,
  useSupabase: false,
  cacheTime: 300,
  routeList: ['teams', 'players', 'matches'],
  dateRegex: /^20[2-9][0-9]-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
  gameTime: 600,
}
