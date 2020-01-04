const models = require('../../connections/sequelize')
const connection = require('../../connections/connection')
const { logger } = require('../../loggers/logger')
module.exports = {
    get: ('/', async (req, res) => {
        const fetchDownlines = async (id) => {
            try {
                models.Downlines.belongsTo(models.User, { foreignKey: "right_leg_id", as: "right_leg" })
                models.Downlines.belongsTo(models.User, { foreignKey: "left_leg_id", as: "left_leg" })
                // models.User.hasMany(models.Downlines, {as: "user1", foreignKey: "right_leg_id" })
                // let member = await connection.query(`SELECT d.user_id, d.right_leg_id, d.left_leg_id, u.firstname, r.firstname, l.firstname FROM Downlines d JOIN Users u  on d.user_id = u.user_id, JOIN Users l on d.user_id = l.user_id JOIN Users r  on d.user_id = r.user_id WHERE user_id=${userId}`)

                let member = await models.Downlines.findOne({
                    where: {
                        user_id: userId
                    },
                    include: [{
                        model: models.User,
                        where: {
                            // user_id: {$col: "left_leg_Id"}
                        },
                        as: "right_leg"
                    }, {
                        model: models.User,
                        where: {
                            // user_id: {$col: "left_leg_Id"}
                        },
                        as: "left_leg"
                    },]
                })
                // let dataToSend = {
                //     balance: balance.dataValues.balance
                // }
                if (member !== null) {
                    let rightLegArr = [];
                    let leftLegArr = [];
                    let leftMember = await models.Downlines.findOne({
                        where: {
                            user_id: member.dataValues.left_leg_id
                        }
                    })

                    let rightMember = await models.Downlines.findOne({
                        where: {
                            user_id: member.dataValues.right_leg_id
                        }
                    })
                } else {
                    // send back member doesnt exist
                }
                return res.status(200).json(member)
            } catch (error) {
                logger.error(error.toString())
                return res.status(400).json(error.toString())
            }
        }
        let userId = req.params.id;

    })
};
