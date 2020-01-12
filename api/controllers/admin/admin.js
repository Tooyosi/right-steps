const models = require('../../connections/sequelize')
const { logger } = require('../../loggers/logger')
const nodemailer = require("nodemailer");

module.exports = {
    get: ('/', async (req, res) => {
        let userId = req.params.id;
        try {
            models.AdminMembers.belongsTo(models.Account, { foreignKey: "account_id" })
            models.AdminMembers.belongsTo(models.User, { foreignKey: "user_id" })
            let member = await models.AdminMembers.findOne({
                where: {
                    user_id: userId
                },
                include: [{
                    model: models.Account,
                }, {
                    model: models.User,
                },]
            })
            // let dataToSend = {
            //     balance: balance.dataValues.balance
            // }
            return res.status(200).json(member)
        } catch (error) {
            logger.error(error.toString())
            return res.status(400).json(error.toString())
        }
    }),

    post: ('/', async (req, res) => {
        let { firstname, lastname, phone, email, gender, dob, country, state, username } = req.body;
        var ts = new Date().getTime()
        try {
            let newUser = await models.User.build({
                firstname: firstname,
                lastname: lastname,
                username: username,
                email_address: email,
                role_id: 1,
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
                    balance: 1200,
                    date_updated: new Date().toISOString().slice(0, 19).replace('T', ' '),
                })

                let newMember = await models.AdminMembers.create({
                    user_id: newUser.dataValues.user_id,
                    current_stage: 1,
                    account_id: userAccount.dataValues.account_id,
                    referral_id: `${newUser.dataValues.username}${newUser.dataValues.user_id}`
                })



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
                    subject: "Right-Steps Admin Registeration Complete",
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



        } catch (error) {
            logger.error(error.original ? error.original.toString() : error.toString())
            return res.status(400).send(error.original ? error.original.toString() : error.toString())
        }

    }),

    referral: ('/', async (req, res) => {
        let userId = req.params.id;
        try {
            let members = await models.AdminMembers.findOne({
                where: {
                    user_id: userId
                },
            })
            if (members !== null && members !== undefined) {
                return res.status(200).json(members.dataValues.referral_id)
            } else {
                return res.status(400).json('User is not a member of this platform')
            }
        } catch (error) {
            logger.error(error.toString())
            return res.status(400).json(error.toString())

        }
    }),

    getAllMembers: ('/', async (req, res) => {
        let {offset, date} = req.body
        let includeArr = []
            if (date !== "") {
                includeArr.push({
                    model: models.User,
                    where: {
                        date_created: date,
                    },
                    required: false,

                })
            } else {

                includeArr.push({
                    model: models.User,
                    required: false,
                })
            }
            models.Members.belongsTo(models.User, { foreignKey: "user_id" })

        try {
            let members = await models.Members.findAndCountAll({
                offset: offset,
                limit: 10,
                order: [['member_id', 'DESC']],
                include: includeArr
            })
            let dataToSend = []
            let { rows, count } = members;
            if (rows.length > 0) {
                for (i = 0; i < rows.length; i++) {
                    if (rows[i].dataValues.user !== null) {
                        let member = {
                            user_id: rows[i].dataValues.user_id,
                            id: rows[i].dataValues.member_id,
                            name: `${rows[i].dataValues.user.dataValues.firstname} ${rows[i].dataValues.user.dataValues.lastname}`,
                            state: `${rows[i].dataValues.user.dataValues.state}`,
                            stage: `${rows[i].dataValues.current_stage}  `
                        }
                        dataToSend.push(member)
                    }
                }
            }
            let sendObj = {
                count,
                row: dataToSend
            }
            return res.status(200).json(sendObj)
        } catch (error) {
            console.log(error)
            return res.status(400).json(error.toString())
        }
    })
};
