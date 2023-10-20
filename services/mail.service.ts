import { createTransport, type Transporter } from 'nodemailer'
import mailConfig from '../configs/mail.config'

let transport: Transporter

export default (): Transporter => {
  if (transport) return transport
  transport = createTransport(mailConfig.auth)
  transport.sendMail(mailConfig.options, (error: Error): void => {
    if (!error) {
      console.log(`${new Date().toLocaleTimeString('pl-PL')} [mail] connected to mail`)
      return
    }
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [mail] unable to connect to mail (check your configuration)`)
    process.exit(0)
  })
  return transport
}
