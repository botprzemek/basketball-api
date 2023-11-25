import defaultConfig from './default.config'

export default {
	enabled: true,
	auth: {
		pool: true,
		host: process.env.MAIL_URL,
		port: parseInt(process.env.MAIL_PORT as string),
		secure: false,
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASSWORD
		}
	},
	options: {
		from: `${defaultConfig.name} <${defaultConfig.email}>`,
		to: defaultConfig.email.replace('info', 'test'),
		subject: 'Test',
		html: '<h1>Test</h1>'
	}
}
