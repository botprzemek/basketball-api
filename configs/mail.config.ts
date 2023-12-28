import defaultConfig from './default.config'
import * as process from 'process'
import Service from 'types/service.enum'
import MailAuth from 'types/mail.interface'

const enabled: boolean = !!process.env.MAIL_SERVICE

let auth: MailAuth = {}

if (enabled) {
	switch ((process.env.MAIL_SERVICE as string).toUpperCase() as unknown as Service) {
		case Service.GMAIL: {
			auth = {
				pool: true,
				service: 'gmail',
				auth: {
					user: process.env.MAIL_LOGIN,
					pass: `${process.env.MAIL_AUTH}#`
				}
			}
			break
		}
		case Service.THIRD_PARTY: {
			auth = {
				pool: true,
				host: process.env.MAIL_URL,
				port: Number(process.env.MAIL_PORT || '587'),
				secure: false,
				auth: {
					user: process.env.MAIL_USER,
					pass: process.env.MAIL_PASSWORD
				}
			}
			break
		}
		default: {
			auth = {
				pool: true,
				host: process.env.MAIL_URL,
				port: Number(process.env.MAIL_PORT || '587'),
				secure: false,
				auth: {
					user: process.env.MAIL_USER,
					pass: process.env.MAIL_PASSWORD
				}
			}
			break
		}
	}
}

export default {
	enabled: enabled,
	auth: auth,
	options: {
		from: `${defaultConfig.name} <${defaultConfig.email}>`,
		to: defaultConfig.email.replace('info', 'test'),
		subject: 'Test',
		html: '<h1>Test</h1>'
	}
}
