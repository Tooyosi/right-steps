const express = require('express');
const models = require('../connections/sequelize')
const { logger } = require('./../loggers/logger')
const nodemailer = require("nodemailer");
const notificationCreate = require('./functions/createNotification')
const dateValue = require('./functions/dateValue')
const updateAccount = require('./functions/updateAccount')
const updateAncestors = require('./functions/getAncestors')
const transferCreate = require('./functions/createTransfer')
const md5 = require('md5')
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
                // get sponsor account details and deduct #30 from it if balance is greater than #30 

                let sponsorAccount = await models.Account.findOne({
                    where: {
                        user_id: userSponsor.dataValues.user_id,
                    }
                })
                if (Number(sponsorAccount.dataValues.balance) >= 30 || userSponsor.role_id == 1) {

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
                        let userUplineId = await models.Members.findOne({
                            where: {
                                user_id: userUpline.dataValues.user_id
                            }
                        })
                        // console.log(membersCheck.length)
                        // if direct downlines is less than 2, add more
                        if (membersCheck.length < 2 || userUpline.role_id == 1) {
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
                                password: md5(ts),
                                date_created: dateValue,
                                last_login_date: dateValue,
                            }).save()
                            if (newUser) {
                                const signupFee = 30;
                                // create an account for newly registered member
                                let userAccount = await models.Account.create({
                                    user_id: newUser.dataValues.user_id,
                                    balance: 0,
                                    date_updated: dateValue,
                                })

                                // create a member table newly registered member
                                let newMember = await models.Members.create({
                                    user_id: newUser.dataValues.user_id,
                                    upline_id: userUpline.dataValues.user_id,
                                    parentId: userUplineId ? userUplineId.dataValues.member_id : null,
                                    sponsor_id: userSponsor.dataValues.user_id,
                                    current_stage: 1,
                                    account_id: userAccount.dataValues.account_id,
                                    referral_id: `${newUser.dataValues.username}${newUser.dataValues.user_id}`,
                                    parentMember_id: userUplineId ? userUplineId.dataValues.member_id : null
                                })
                                // Update Sponsors Bonus
                                const bonusAmount = (Number(signupFee) * 0.2)

                                let sponsorBonus = await models.Bonus.create({
                                    user_id: userSponsor.dataValues.user_id,
                                    bonus_type_id: 1,
                                    amount: bonusAmount,
                                    date: dateValue,
                                })

                                let balance 
                                if(userSponsor.role_id == 1) { 
                                    balance = Number(sponsorAccount.dataValues.balance)
                                } else {
                                     balance = Number(sponsorAccount.dataValues.balance) - 30

                                    // add to sponsors transaction list 
                                    await transferCreate(userSponsor.dataValues.user_id, 'Registration fee deduction', dateValue, 30, `${userSponsor.dataValues.firstname} ${userSponsor.dataValues.lastname}`, `${firstname} ${lastname}` )

                                };
                                // add to new users transaction list
                                // await transferCreate(newUser.dataValues.user_id, 'Registration fee', dateValue, 30, `${userSponsor.dataValues.firstname} ${userSponsor.dataValues.lastname}`, `${firstname} ${lastname}` )

                                let newBalance = bonusAmount + balance

                                // add to bonus sponsors transaction list 
                                await transferCreate(userSponsor.dataValues.user_id, 'Registeration Bonus', dateValue, bonusAmount, `${firstname} ${lastname}`, `${userSponsor.dataValues.firstname} ${userSponsor.dataValues.lastname}` )
                                
                                // update the sponsor account balance with the newly summed up balance
                                let updatedSponsorAccount = await updateAccount(sponsorAccount, newBalance, dateValue)


                                // check if user exist on referral table and add upline to referral table
                                let updateDownlines = await models.Downlines.findOne({
                                    where: {
                                        user_id: userUpline.dataValues.user_id
                                    }
                                })
                                if (updateDownlines == null) {
                                    // create and add the first leg (left)
                                    let newReferral = await models.Downlines.create({
                                        user_id: userUpline.dataValues.user_id,
                                        left_leg_id: newUser.dataValues.user_id
                                    })
                                } else if (updateDownlines.dataValues.left_leg_id !== null) {
                                    // update with the second leg
                                    let secondReferralUpdate = await updateDownlines.update({
                                        right_leg_id: newUser.dataValues.user_id
                                    })
                                }

                                let newSponsorNotification
                                userUpline.role_id == 1 ? 
                                newSponsorNotification = await notificationCreate(userSponsor.dataValues.user_id, `Received Referral Bonus of $${bonusAmount}, from new user: ${firstname} ${lastname}'s registeration.New Balance is $${newBalance}`, dateValue)
                                :
                                newSponsorNotification = await notificationCreate(userSponsor.dataValues.user_id, `Registeration fee of $30 deducted, Received Referral Bonus of $${bonusAmount}, from new user: ${firstname} ${lastname}'s registeration. New Balance is $${newBalance}`, dateValue);
                                if (userSponsor.dataValues.user_id !== userUpline.dataValues.user_id) {
                                    let newUplineNotification = await notificationCreate(userUpline.dataValues.user_id, `New Downline registered by user ${userSponsor.dataValues.firstname} ${userSponsor.dataValues.lastname}`, dateValue)
                                }
                                

                                // to go through all stages atleast 4 times
                                // for (let i = 0; i < 3; i++) {
                                    // updateAncestors(userUpline.dataValues.user_id)
                                    updateAncestors(newUser.dataValues.user_id)
                                    
                                // }
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
                    let errorMsg = `User Creation Failed, ${sponsor} does not have enough balance to register. Kindly Top-up account to continue`;
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
