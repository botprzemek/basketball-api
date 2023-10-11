import { type MailOptions } from 'nodemailer/lib/sendmail-transport'
import mail from '../mail.service'
import config from 'config'

export default function (receiver: string, data: { title: string; body: string }): void {
  const mailOptions: MailOptions = {
    from: `${config.name} <${config.email}>`,
    to: receiver,
    subject: data.title,
    html: data.body,
  }
  mail().sendMail(mailOptions, (error: Error): void => {
    error
      ? console.log(`${new Date().toLocaleTimeString('pl-PL')} [mail] error occurred when sending mail`)
      : console.log(`${new Date().toLocaleTimeString('pl-PL')} [mail] sent mail to ${receiver}`)
  })
}
