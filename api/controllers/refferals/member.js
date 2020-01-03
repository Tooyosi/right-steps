const models = require('../../connections/sequelize')
const { logger } = require('../../loggers/logger')
module.exports = {
    get: ('/', async (req, res) => {
        let  userId = req.params.id;
        try {
            models.Members.belongsTo(models.Account, { foreignKey: "account_id" })
            models.Members.belongsTo(models.User, { foreignKey: "user_id" })
            let member = await models.Members.findOne({
                where:{
                    user_id: userId
                },
                include: [{
                    model: models.Account,
                },{
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

    referral: ('/', async (req, res) => {
        let  userId = req.params.id;
        try {
            models.Members.belongsTo(models.User, { foreignKey: "user_id" })
            let member = await models.Members.findOne({
                where:{
                    referral_id: userId
                },
                include: [{
                    model: models.User,
                },]
            })
            return res.status(200).json(member)
        } catch (error) {
            logger.error(error.toString())
            return res.status(400).json(error.toString())
        }
    }),
};
