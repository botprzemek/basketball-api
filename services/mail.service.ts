import { createTransport, Transporter } from 'nodemailer'
import mailConfig from 'configs/mail.config'

let mail: Transporter

const assign = (): Transporter => {
  mail = createTransport(mailConfig.auth)
  return mail
}

export default (): Transporter => {
  return mail ? mail : assign()
}
