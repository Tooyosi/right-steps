const models = require('../../connections/sequelize')
const sequelize = require('../../connections/connection')
const { logger } = require('../../loggers/logger')
const multer = require('multer')
const uploadFunction = require('../functions/multer')
const notificationCreate = require('../functions/createNotification');
const dateValue = require('../functions/dateValue');

const upload = uploadFunction('./uploads/requests')
var uploader = upload.single('proofImage')
module.exports = {
    getAllAwards: ('/', async (req, res) => {
        let { offset, date, userId, status } = req.query
        let obj = {
            offset: Number(offset),
            limit: 10,
            order: [['award_id', 'DESC']],
            include: [{
                model: models.AwardTypes,
                required: false,
                as: 'type',
                attributes: ['name']
            }
            ]
        }
        let whereObj = {}
        if (date !== "") {
            whereObj.date = date;
            obj.where = whereObj

        }
        if (userId !== "") {
            whereObj.user_id = userId
            obj.where = whereObj
        }
        if (status !== "") {
            whereObj.status = status
            obj.where = whereObj
        }

        try {
            const allAwards = await models.Awards.findAndCountAll(obj)
            let newRow = []
            if (allAwards.rows.length > 0) {
                for (let i = 0; i < allAwards.rows.length; i++) {
                    let member = await models.User.findOne({
                        where: {
                            user_id: allAwards.rows[i].user_id
                        }
                    })
                    let newItem = allAwards.rows[i].dataValues 
                    newItem['user'] = member
                    newRow.push(allAwards.rows[i]);
                }
            }
            allAwards.rows = newRow;
            
            return res.status(200).send(allAwards)
        } catch (error) {
            console.log
            logger.error(error.toString())
            return res.status(400).json(error.toString())
        }

    }),

    approveAward: ('/', async (req, res) => {
        let { role: { name } } = req.user
        if (name !== 'Admin') {
            return res.status(400).send('You are not authorized to perform this operation')
        }
        let { awardId } = req.body
        try {
            const award = await models.Awards.findOne({
                where: {
                    award_id: awardId
                }
            })
            if (award !== null && award !== undefined) {
                let msg, updatedRequest, newBalance, notificationMessage
                if(award.status == "Pending"){
                    await award.update({
                        status: 'Approved'
                    })
                    return res.status(200).send('Award successfully Approved')
                }


            } else {
                return res.status(400).json('Award doesnt exist')

            }
        } catch (error) {
            console.log(error)
            logger.error(error.toString())
            return res.status(400).json(error.toString())

        }
    })
};
