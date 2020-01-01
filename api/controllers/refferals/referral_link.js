const models = require('../../connections/sequelize')
const { logger } = require('../../loggers/logger')
module.exports = {
    get: ('/', async (req, res) => {
        let  userId  = req.params.id;
        try {
            let members = await models.Members.findOne({
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
    })
};
