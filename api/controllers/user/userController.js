const models = require('../../connections/sequelize')
const sequelize = require('../../connections/connection')
const Op = require('sequelize').Op
const getDownlines = require('../functions/getDownlines')
const { logger } = require('../../loggers/logger')
const multer = require('multer')
const uploadFunction = require('../functions/multer')
const dateValue = require('../functions/dateValue');
const fs = require('fs')
let notificationCreate = require('../functions/createNotification')
let transferCreate = require('../functions/createTransfer')
let date = require('../functions/dateValue')

const upload = uploadFunction('./uploads/profile')
var uploader = upload.single('userImage')

module.exports = {
    get: ('/', async (req, res) => {
        let { id } = req.params
        try {
            const members = await getDownlines(id)
            return res.status(200).send(members)
        } catch (error) {
            logger.error(error.toString())
            return res.status(400).json(error.toString())

        }

    }),

    bonus: ('/', async (req, res) => {
        let { id } = req.params

        try {
            let userBonus = await models.Bonus.findAll({
                where: {
                    user_id: id
                }
            })

            let bonusTypes = {
                referral: 0,
                matching: 0,
                matrix: 0,
                total: 0
            }
            await userBonus.forEach((bonus) => {
                if (bonus.bonus_type_id == 1) {
                    bonusTypes.referral += Number(bonus.amount)
                } else if (bonus.bonus_type_id == 2) {
                    bonusTypes.matrix += Number(bonus.amount)
                } else if (bonus.bonus_type_id == 3) {
                    bonusTypes.matching += Number(bonus.amount)
                }
                bonusTypes.total += Number(bonus.amount)

            });
            return res.status(200).send(bonusTypes)
        } catch (error) {
            logger.error(error.toString())
            return res.status(400).json(error.toString())
        }
    }),
    notificationsPost: ('/', async (req, res) => {
        let { userId, date, offset } = req.body;
        let whereObj = {
            user_id: userId
        };
        if (date !== "") {

            whereObj.date = date

        }
        try {
            let userNotification = await models.Notifications.findAndCountAll({
                where: whereObj,
                offset: offset,
                limit: 10,
                order: [['notification_id', 'DESC']]
            })

            return res.status(200).json(userNotification)
        } catch (error) {
            logger.error(error.toString())
            return res.status(400).json(error.toString())
        }

    }),

    put: ('/', async (req, res) => {
        uploader(req, res, async (err) => {
            let { userId, firstname, lastname, phone, gender, dob } = req.body

            if (err instanceof multer.MulterError) {
                logger.error(err.message ? err.message : err.toString())
                return res.status(400).send(err.message ? err.message : err.toString())
            } else if (err) {
                logger.error(err.toString())
                return res.status(400).send(err.toString())
            } else {
                try {
                    models.User.belongsTo(models.Role, { foreignKey: "role_id" })
                    let userDetails = await models.User.findOne({
                        where: {
                            user_id: userId
                        },
                        include: [{
                            model: models.Role,
                        }]
                    })
                    if (userDetails !== null) {
                        let obj = {
                            user_id: userId,
                            last_update: dateValue
                        }
                        if (req.file !== null && req.file !== undefined) {
                            if (userDetails.passport !== null) {
                                fs.unlinkSync(`./${userDetails.passport}`)
                            }
                            obj.passport = req.file.path
                        }
                        if (firstname !== '') {
                            obj.firstname = firstname
                        }
                        if (lastname !== '') {
                            obj.lastname = lastname
                        }
                        if (phone !== '') {
                            obj.phone_no = phone
                        }
                        if (gender !== '') {
                            obj.gender = gender
                        }
                        if (dob !== '') {
                            obj.dob = dob
                        }

                        let updatedUser = await userDetails.update(obj)
                        return res.status(200).send(updatedUser)
                    } else {
                        logger.error('User does not exist')
                        return res.status(400).send('User does not exist')

                    }
                } catch (error) {
                    logger.error(error.toString())
                    return res.status(400).send(error.toString())

                }
            }
        })
    }),

    search: ('/', async (req, res) => {
        let { searchTerm } = req.params;
        let { offset } = req.query
        try {
            let users = await models.User.findAndCountAll({
                where: {
                    [Op.or]: [{
                        username: {
                            [Op.like]: `%${searchTerm}%`
                        },
                    }, {
                        firstname: {
                            [Op.like]: `%${searchTerm}%`
                        }
                    },
                    {
                        firstname: {
                            [Op.like]: `%${searchTerm}%`
                        }
                    }]
                },
                offset: Number(offset),
                limit: 10,
                // offset: offset

            })
            return res.status(200).json(users)
        } catch (error) {
            logger.error(error.toString())
            return res.status(400).json(error.toString())
        }
    }),

    transfer: ('/', async (req, res) => {
        let { userId } = req.params;
        let {
            senderId,
            senderName,
            receiverName,
            amount
        } = req.body
        if (userId == senderId) {
            return res.status(400).json("You can't make a transfer to yourself")
        }
        try {
            let userAccount = await models.Account.findOne({
                where: {
                    user_id: userId
                }
            })
            let senderAccount = await models.Account.findOne({
                where: {
                    user_id: senderId
                }
            })
            if (userAccount == null || senderAccount == null) {
                return res.status(400).json("No Account attached to the user")
            } else {
                if (Number(senderAccount.balance) < Number(amount)) {
                    return res.status(400).json("Insufficient funds")
                } else {
                    let newSenderBalance = Number(senderAccount.balance) - Number(amount);
                    let newUserBalance = Number(userAccount.balance) + Number(amount)
                    await userAccount.update({
                        balance: newUserBalance
                    })
                    await senderAccount.update({
                        balance: newSenderBalance
                    })
                    await notificationCreate(userId, `$${amount} has been credited into your account by ${senderName}`, date)
                    await notificationCreate(senderId, `$${amount} has been debited from your account for transfer to ${receiverName}`, date)
                    await transferCreate(senderId, 'Sent', date, amount, senderName, receiverName )
                    await transferCreate(userId, 'Received', date, amount, senderName, receiverName )
                    return res.status(200).send(`Transfer of $${amount} to ${receiverName} successful`)
                }
            }
        } catch (error){
            logger.error(error.toString())
            return res.status(400).json(error.toString())
        }
    }),

    getTransfers: ('/', async (req, res) =>{
        let { userId } = req.params;
        let { offset } = req.query
        try {
            let transfers = await models.Transfers.findAndCountAll({
                where: {
                    user_id: userId
                },
                limit: 10,
                offset: Number(offset),
                order: [['transfer_id', 'DESC']]
            })
            return res.status(200).send(transfers)
        } catch (error) {
            logger.error(error.toString())
            return res.status(400).json(error.toString()) 
        }
    })
};
