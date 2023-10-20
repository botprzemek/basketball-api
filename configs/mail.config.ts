export default {
  auth: {
    pool: true,
    host: process.env.MAIL_URL,
    port: parseInt(process.env.MAIL_PORT as string),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  },
  options: {
    from: 'Knury Knurów <system@knuryknurow.pl>',
    to: 'testing@knuryknurow.pl',
    subject: 'test',
    html: '<h1>test</h1>',
  },
}
