const nodemailer = require('nodemailer')

async function sendMail({ from, to, subject, text, html }) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: '465',
        secure: true,
        auth: {
            user: 'rahulvyas7399@gmail.com',
            pass: 'twgoxqvbrlvcakyu'
        }
    })
    let info = await transporter.sendMail({
        from:from,
        to:to,
        subject:subject,
        html:html
    })
    console.log(info)
}

module.exports = sendMail;