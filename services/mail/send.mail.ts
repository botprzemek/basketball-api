import { type MailOptions } from 'nodemailer/lib/sendmail-transport'
import defaultConfig from 'configs/default.config'
import mailConfig from 'configs/mail.config'
import mail from 'services/mail.service'

export default function (receiver: string, data: { title: string; body: string }): void {
  if (!mailConfig.enabled) return
  const mailOptions: MailOptions = {
    from: `${defaultConfig.name} <${defaultConfig.email}>`,
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
