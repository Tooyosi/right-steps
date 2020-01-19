const models = require('../../connections/sequelize')
const sequelize = require('../../connections/connection')
const { logger } = require('../../loggers/logger')
const uuidv1 = require('uuid/v1');
const multer = require('multer')
const uploadFunction = require('../functions/multer')
const notificationCreate = require('../functions/createNotification');
const dateValue = require('../functions/dateValue');

const upload = uploadFunction('./uploads/requests')
var uploader = upload.single('proofImage')
module.exports = {
    getAllRequests: ('/', async (req, res) => {
        let { offset, date, userId, status } = req.query
        let obj = {
            offset: Number(offset),
            limit: 10,
            order: [['request_id', 'DESC']],
            include: [{
                model: models.User,
                required: false,
                as: 'requester',
                attributes: ['firstname', 'lastname', 'username']
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
            const allRequests = await models.Requests.findAndCountAll(obj)
            let newRow = []
            if (allRequests.rows.length > 0) {
                for (let i = 0; i < allRequests.rows.length; i++) {
                    let member = await models.Members.findOne({
                        where: {
                            user_id: allRequests.rows[i].user_id
                        }
                    })
                    let newItem = allRequests.rows[i].dataValues 
                    newItem['account'] = member
                    newRow.push(allRequests.rows[i]);
                }
            }
            allRequests.rows = newRow;
            
            return res.status(200).send(allRequests)
        } catch (error) {
            console.log
            logger.error(error.toString())
            return res.status(400).json(error.toString())

        }

    }),

    addRequest: ('/', async (req, res) => {
        // res.send('ok')
        // fs.unlinkSync('./uploads/requests/157891295977956625e90df731.jpg'); 
        // console.log('File deleted!');
        uploader(req, res, async (err) => {
            let { userId, type, amount, date, proof } = req.body

            if (err instanceof multer.MulterError) {
                logger.error(err.message ? err.message : err.toString())
                return res.status(400).send(err.message ? err.message : err.toString())
            } else if (err) {
                logger.error(err.toString())
                return res.status(400).send(err.toString())
            } else {
                // console.log(req.body[1])
                let reference = uuidv1();
                let obj = {
                    user_id: userId,
                    trans_reference: reference,
                    request_type: type,
                    status: "Pending",
                    amount: amount,
                    date: date
                }
                if (req.file !== null && req.file !== undefined) {
                    obj.proof = req.file.path
                }
                try {
                    let newRequest = await models.Requests.create(obj)

                    if (newRequest !== null) {
                        return res.status(200).send(`New request with reference: ${reference} has been successfully created`)
                    } else {
                        return res.status(400).send(`An error occured while creating request`)

                    }
                } catch (error) {
                    logger.error(error.toString())
                    return res.status(400).json(error.toString())

                }
            }

        })
    }),

    approveRequest: ('/', async (req, res) => {
        let { role: { name } } = req.user
        if (name !== 'Admin') {
            return res.status(400).send('You are not authorized to perform this operation')
        }
        let { requestId, type } = req.body
        try {
            const request = await models.Requests.findOne({
                where: {
                    request_id: requestId
                },
                include: {
                    model: models.User,
                    required: false,
                    as: 'requester',
                    attributes: ['firstname', 'lastname', 'username']
                }
            })
            if (request !== null && request !== undefined) {
                let msg, updatedRequest, newBalance, notificationMessage
                let requesterAccount = await models.Account.findOne({
                    where: {
                        user_id: request.dataValues.user_id
                    }
                })
                if (type == 'Approve') {
                    updatedRequest = await request.update({
                        status: 'Approved'
                    })

                    if (request.dataValues.request_type == "Deposit") {
                        newBalance = Number(requesterAccount.balance) + Number(request.dataValues.amount)
                        notificationMessage = `Sum of $${request.dataValues.amount} has been debited to your account for transaction ${request.dataValues.trans_reference}. New Balance is ${newBalance}`
                    } else if (request.dataValues.request_type == "Withdrawal") {

                        if (Number(requesterAccount.balance) > Number(request.dataValues.amount)) {
                            newBalance = Number(requesterAccount.balance) - Number(request.dataValues.amount)
                            notificationMessage = `Sum of $${request.dataValues.amount} has been withdrawn from your account for transaction ${request.dataValues.trans_reference}. New Balance is ${newBalance}`

                        } else {
                            return res.status(400).json('User Balance less than amount')

                        }
                    }
                    let updatedAccount = await requesterAccount.update({
                        balance: newBalance
                    })

                    // if (updatedAccount !== null && updatedAccount == undefined) {
                    let newNotification = await notificationCreate(request.dataValues.user_id, notificationMessage, dateValue)
                    // }
                    msg = 'Request Succesfully Approved'
                } else if (type == 'Decline') {
                    updatedRequest = await request.update({
                        status: 'Declined'
                    })
                    msg = 'Request Succesfully Declined'
                }

                return res.status(200).send(msg)

            } else {
                return res.status(400).json('Transaction doesnt exist')

            }
        } catch (error) {
            console.log(error)
            logger.error(error.toString())
            return res.status(400).json(error.toString())

        }
    })
};
