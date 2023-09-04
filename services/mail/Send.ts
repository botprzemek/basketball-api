import { MailOptions } from 'nodemailer/lib/sendmail-transport'
import mail from './Mail'
import config from 'Config'

export default function (receiver: string): void {
  const mailOptions: MailOptions = {
    from: `${config.name} <info@mail.botprzemek.pl>`,
    to: receiver,
    subject: 'Witaj!',
    html: '<h1>Test</h1>',
  }
  mail().sendMail(mailOptions, (error: Error): void =>
    error
      ? console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] error occurred when sending mail (${error})`)
      : console.log(`${new Date().toLocaleTimeString('pl-PL')} [storage] sent mail to ${receiver}`),
  )
}
