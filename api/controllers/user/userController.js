const models = require('../../connections/sequelize')
const sequelize = require('../../connections/connection')
const getDownlines = require('../functions/getDownlines')
const { logger } = require('../../loggers/logger')
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
                if(bonus.bonus_type_id == 1){
                    bonusTypes.referral +=  Number(bonus.amount)
                }else if(bonus.bonus_type_id == 2){
                    bonusTypes.matrix += Number(bonus.amount)
                }else if(bonus.bonus_type_id == 3){
                    bonusTypes.matching +=  Number(bonus.amount)
                }
                bonusTypes.total +=  Number(bonus.amount)

            });
            return res.status(200).send(bonusTypes)
        } catch (error) {
            logger.error(error.toString())
            return res.status(400).json(error.toString())
        }
    }),
    notificationsPost: ('/', async (req, res) => {
        let { userId, date } = req.body;
        let whereObj = {
            user_id: userId
        };
        if (date !== "") {

            whereObj.date = date

        }
        try {
            let userNotification = await models.Notifications.findAll({
                where: whereObj
            })

            return res.status(200).json(userNotification)
        } catch (error) {
            logger.error(error.toString())
            return res.status(400).json(error.toString())
        }

    })
};
