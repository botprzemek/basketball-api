import {MailOptions} from 'nodemailer/lib/sendmail-transport'
import mail from './Mail'
import config from '../../configs/Default.config'

export default function (receiver: string): void {
  const mailOptions: MailOptions = {
    from: `${config.name} <${config.email}>`,
    to: receiver,
    subject: 'Witaj!',
    html: '<h1>Test</h1>',
  }
  mail().sendMail(mailOptions, (error: Error): void =>
    error
      ? console.log(`${new Date().toLocaleTimeString('pl-PL')} [mail] error occurred when sending mail (${error})`)
      : console.log(`${new Date().toLocaleTimeString('pl-PL')} [mail] sent mail to ${receiver}`),
  )
}
