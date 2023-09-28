import { createTransport, type Transporter } from 'nodemailer'
import sendMail from 'services/mail/send.mail'
import config from 'config'
import { type MailOptions } from 'nodemailer/lib/sendmail-transport'

let transport: Transporter

export default (): Transporter => {
  if (transport) return transport
  const config = {
    pool: true,
    host: process.env.MAIL_URL,
    port: parseInt(process.env.MAIL_PORT as string),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  }
  const mailOptions: MailOptions = {
    from: 'test <test>',
    to: 'test@test.test',
    subject: 'test',
    html: '<h1>test</h1>',
  }
  transport = createTransport(config)
  transport.sendMail(mailOptions, (error: Error): void => {
    if (!error) {
      console.log(`${new Date().toLocaleTimeString('pl-PL')} [mail] connected to mail`)
      return
    }
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [mail] unable to connect to mail (check your configuration)`)
    process.exit(0)
  })
  return transport
}
