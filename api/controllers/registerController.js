const express = require('express');
const models = require('../connections/sequelize')
const { logger } = require('./../loggers/logger')
const nodemailer = require("nodemailer");

module.exports = {
    post: ('/', async (req, res) => {
        let { firstname, lastname, phone, email, gender, dob, country, state, username, sponsor, upline, role } = req.body;
        var ts = new Date().getTime()
        try {
            // get the sponsor details
            let userSponsor = await models.User.findOne({
                where: {
                    username: sponsor
                }
            })

            // check if sponsor exists
            if (userSponsor !== null && userSponsor !== undefined) {
                // get upline details
                let userUpline = await models.User.findOne({
                    where: {
                        username: upline
                    }
                })
                // check if upline exists
                if (userUpline !== null && userUpline !== undefined) {
                    // check if upline has more than 2 direct downlines
                    let membersCheck = await models.Members.findAll({
                        where: {
                            upline_id: userUpline.dataValues.user_id,
                        }
                    })

                    // if direct downlines is less than 2, add more
                    if (membersCheck.length < 2) {
                        let newUser = await models.User.build({
                            firstname: firstname,
                            lastname: lastname,
                            username: username,
                            email_address: email,
                            role_id: role,
                            gender: gender,
                            dob: dob,
                            phone_no: phone,
                            country: country,
                            state: state,
                            status: 0,
                            password: ts,
                            date_created: new Date().toISOString().slice(0, 19).replace('T', ' '),
                            last_login_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
                        }).save()
                        if (newUser) {
                            let userAccount = await models.Account.create({
                                user_id: newUser.dataValues.user_id,
                                balance: 200,
                                date_updated: new Date().toISOString().slice(0, 19).replace('T', ' '),
                            })

                            let newMember = await models.Members.create({
                                user_id: newUser.dataValues.user_id,
                                upline_id: userUpline.dataValues.user_id,
                                sponsor_id: userSponsor.dataValues.user_id,
                                current_stage: 1,
                                account_id: userAccount.dataValues.account_id,
                                referral_id: `${newUser.dataValues.username}${newUser.dataValues.user_id}`
                            })

                            // check if user exist on referral table and add upline to referral table
                            let updateDownlines = await models.Downlines.findOne({
                                where:{
                                    user_id: userUpline.dataValues.user_id
                                }
                            })
                            if(updateDownlines == null){
                                // create and add the fight leg
                                let newReferral = await models.Downlines.create({
                                    user_id: userUpline.dataValues.user_id,
                                    right_leg_id: newUser.dataValues.user_id
                                })
                            } else if(updateDownlines.dataValues.right_leg_id !== null){
                                // update with the second leg
                                let secondReferralUpdate = await updateDownlines.update({
                                    left_leg_id: newUser.dataValues.user_id
                                })
                            }
                            
                            var smtpTransport = nodemailer.createTransport({
                                service: "Gmail",
                                auth: {
                                    user: process.env.EMAIL,
                                    pass: process.env.EMAIL_PASSWORD
                                }
                            });

                            var mailOptions = {
                                to: email,
                                from: "Right Steps",
                                subject: "Right-Steps Registeration Complete",
                                text: `Congratulations!! You've been successfully registered to Right-steps
                                            Kindly signin the website with the following credentials:
                                            Username: ${username}
                                            Password: ${ts} `
                            };
                            smtpTransport.sendMail(mailOptions, (err) => {
                                let successMsg
                                if (err) {
                                    logger.error(`${username} with email: ${email} mail sending failed,
                                                      Error: ${err.toString()}`)
                                    successMsg = `A network error occured while sending mail to ${email}.
                                                  Login with the following credentials
                                                  Username: ${username}
                                                  Password: ${ts}`;

                                    return res.status(201)
                                        .send(successMsg);
                                } else {
                                    logger.info(`Registeration mail successfully sent to user: ${username} with email: ${email}`)
                                    successMsg = `User Created Successfully, An email has been sent to ${email} with login credentials`;

                                    return res.status(201)
                                        .send(successMsg);
                                }
                            });

                        }

                    } else {
                        let errorMsg = `User Creation Failed, ${upline} Can not have more than 2 direct downlines`;
                        logger.error(errorMsg);
                        return res.status(400).send(errorMsg);
                    }
                } else {
                    let errorMsg = `User Creation Failed, ${upline} does not exist`;
                    logger.error(errorMsg);
                    return res.status(400).send(errorMsg);
                }
            } else {
                let errorMsg = `User Creation Failed, ${sponsor} does not exist`;
                logger.error(errorMsg);
                return res.status(400).send(errorMsg);
            }

        } catch (error) {
            logger.error(error.original ? error.original.toString() : error.toString())
            return res.status(400).send(error.original ? error.original.toString() : error.toString())
        }

    })
};
