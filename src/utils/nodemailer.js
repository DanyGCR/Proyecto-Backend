import nodemailer from 'nodemailer'

import { PASS_NODEMAILER } from '../config/config.js'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  secure: true,
  auth: {
    user: 'aldairgome97@gmail.com',
    pass: PASS_NODEMAILER
  }
})

export const sendMail = async (user, text, template) => {
  await transporter.sendMail({
    from: 'Desafíos CODERHOUSE',
    to: user.email,
    subject: 'Desafíos CODERHOUSE 👻',
    text,
    html: template
  })
}
