const express = require('express');
const jwt = require('jsonwebtoken');
const models = require('../../connections/sequelize')
const { logger } = require('../../loggers/logger')
const Op = require('sequelize').Op
module.exports = {
    post: ('/', async (req, res) => {
        let { userId, date, offset } = req.body;
        try {
            // based on date input
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

            let members = await models.Members.findAndCountAll({
                where: {
                    [Op.or]: [{
                        sponsor_id: userId,
                    }, { upline_id: userId, }]
                },
                offset: offset,
                limit: 10,
                order: [['member_id', 'DESC']],
                include: includeArr
            })
            let dataToSend = []
            let {rows, count} = members;
            if (rows.length > 0) {
                for (i = 0; i < rows.length; i++) {
                    if (rows[i].dataValues.user !== null) {
                        let member = {
                            user_id: rows[i].dataValues.user_id,
                            id: rows[i].dataValues.member_id,
                            name:  `${rows[i].dataValues.user.dataValues.firstname} ${rows[i].dataValues.user.dataValues.lastname}` ,
                            state: `${rows[i].dataValues.user.dataValues.state}` ,
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
