import * as nodemailer from 'nodemailer'

let transport = null

const initializeMail = () => {
    transport = nodemailer.createTransport({
        pool: true,
        host: process.env.MAIL_URL,
        port: parseInt(process.env.MAIL_PORT),
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        },
    })
    console.log(`${new Date().toLocaleTimeString('pl-PL')} [mail] connected to mail`)
    return transport
}

export function setupMail() {
    initializeMail()
}

export const mail = () => {
    return transport
        ? transport
        : initializeMail()
}