const models = require('../../connections/sequelize')
const sequelize = require('../../connections/connection')
const getDownlines = require('../functions/getDownlines')
const { logger } = require('../../loggers/logger')
const multer = require('multer')
const uploadFunction = require('../functions/multer')
const dateValue = require('../functions/dateValue');
const fs = require('fs')

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
                            if(userDetails.passport !== null){
                                fs.unlinkSync(`./${userDetails.passport}`)
                            }
                            obj.passport = req.file.path
                        }
                        if(firstname !== ''){
                            obj.firstname = firstname 
                        }
                        if(lastname !== ''){
                            obj.lastname = lastname 
                        }
                        if(phone !== ''){
                            obj.phone_no = phone 
                        }
                        if(gender !== ''){
                            obj.gender = gender 
                        }
                        if(dob !== ''){
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
    })
};
