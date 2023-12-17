import defaultConfig from './default.config'
import * as process from 'process'
import Service from 'models/service.enum'

const auth =
	(process.env.MAIL_SERVICE as unknown as Service) === Service.GMAIL
		? {
				service: 'gmail',
				auth: {
					user: process.env.MAIL_USER,
					pass: process.env.MAIL_PASSWORD
				}
		  }
		: {
				pool: true,
				host: process.env.MAIL_URL,
				port: parseInt(process.env.MAIL_PORT || '587'),
				secure: false,
				auth: {
					user: process.env.MAIL_USER,
					pass: process.env.MAIL_PASSWORD
				}
		  }

export default {
	enabled: true,
	auth: auth,
	options: {
		from: `${defaultConfig.name} <${defaultConfig.email}>`,
		to: defaultConfig.email.replace('info', 'test'),
		subject: 'Test',
		html: '<h1>Test</h1>'
	}
}
