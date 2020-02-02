const models = require('../../connections/sequelize')
const sequelize = require('../../connections/connection')
const { logger } = require('../../loggers/logger')
const dateValue = require('../functions/dateValue');
const nodemailer = require('nodemailer')
module.exports = {
    post:  ('/', async (req, res) =>{
        let {username} = req.body
        var ts = new Date().getTime()

        try {
            let user = await models.User.findOne({
                where:{
                   username : username
                }
            })
            if(user == null || user == undefined){ 
                return res.status(400).json('User does not exist')
            }else{
                let updatedUser = await user.update({
                    password: ts,
                    token: null
                })
                var smtpTransport = nodemailer.createTransport({
                    service: "Gmail",
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.EMAIL_PASSWORD
                    }
                });

                var mailOptions = {
                    to: user.email_address,
                    from: "Right Steps",
                    subject: "Right-Steps Password Reset",
                    html: `Your Password has been reset. <br/>Kindly signin the website with the following credentials:<br/>Username: ${username}<br/>Password: ${ts} `
                };
                smtpTransport.sendMail(mailOptions, (err) => {
                    let successMsg
                    if (err) {
                        logger.error(`${username} with email: ${user.email_address} mail sending failed,
                                      Error: ${err.toString()}`)

                        return res.status(201)
                            .send('An error occured, please try again');
                    } else {
                        successMsg = `Password Reset successful, An email has been sent with your new password`;
                        return res.status(201)
                            .send(successMsg);
                    }
                });
            }
        } catch (error) {
            logger.error(error.toString())
            return res.status(400).json(error.toString())
        }
    })
};
