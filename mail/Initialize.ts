import * as dotenv from 'dotenv'
import * as nodemailer from 'nodemailer'

dotenv.config()

let transport = null

const initializeTransport = () => {
    console.log(`[mail] connected to smtp server`)
    transport = nodemailer.createTransport({
        pool: true,
        host: process.env.MAIL_URL,
        port: parseInt(process.env.MAIL_PORT),
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        },
    })
    return transport
}

export default function () {
    return transport
        ? transport
        : initializeTransport()
}