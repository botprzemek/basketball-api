import mailConfig from 'configs/mail.config'
import mail from 'services/mail.service'
import { Transporter } from 'nodemailer'

export default (): void => {
	const transporter: Transporter = mail()

	if (!transporter) return

	if (!mailConfig.enabled) return

	transporter.sendMail(mailConfig.options, (error: Error): void => {
		if (!error) {
			console.log(`${new Date().toLocaleTimeString('pl-PL')} [mail] connected to mail`)
			return
		}
		console.log(
			`${new Date().toLocaleTimeString(
				'pl-PL'
			)} [mail] unable to connect to mail (check your configuration)`
		)
		process.exit(0)
	})
}
