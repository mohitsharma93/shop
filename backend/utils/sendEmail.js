const nodeMailer = require('nodemailer');

const sendMail = async options => {
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  })

  const message = {
    from: process.env.EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message
  }

  await transporter.sendMail(message);
}

module.exports = sendMail;