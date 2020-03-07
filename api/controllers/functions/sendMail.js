const nodemailer = require("nodemailer");
const { logger } = require('./../../loggers/logger')

let sendMail = async (email, from, subject, text) => {
    var smtpTransport = nodemailer.createTransport({
        service: "https://business45.web-hosting.com",
        port: 465,
        secure: true,
        tls: {
            rejectUnauthorized:false
        },
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    var mailOptions = {
        to: email,
        from: process.env.EMAIL,
        subject: subject,
        text: text
    };

    let response = await smtpTransport.sendMail(mailOptions, (err) => {
        if (err) {
            console.log(err)
            logger.error(err.toString())
            return false
        } else {
            console.log('success')
            return true
        }
    });

    return response;
}
module.exports = sendMail