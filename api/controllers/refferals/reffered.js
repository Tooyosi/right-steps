const express = require('express');
const jwt = require('jsonwebtoken');
const models = require('../../connections/sequelize')
const { logger } = require('../../loggers/logger')
module.exports = {
    post: ('/', async (req, res) => {
        let { userId, date } = req.body;
        try {
            // based on date input
            let includeArr = []
            if (date !== "") {
                includeArr.push ({
                    model: models.User,
                        where: {
                        date_created: date
                    }

                })
            } else {

                includeArr.push({
                    model: models.User
                })
            }
            models.Members.belongsTo(models.User, { foreignKey: "user_id" })

            let members = await models.Members.findAll({
                where: {
                    sponsor_id: userId
                },
                include: includeArr
            })
            let dataToSend = []
            if (members.length > 0) {
                for (i = 0; i < members.length; i++) {
                    let member = {
                        user_id: members[i].dataValues.user_id,
                        id: members[i].dataValues.member_id,
                        name: `${members[i].dataValues.user.dataValues.firstname} ${members[i].dataValues.user.dataValues.lastname}`,
                        state: `${members[i].dataValues.user.dataValues.state}`,
                        stage: `${members[i].dataValues.current_stage}`
                    }
                    dataToSend.push(member)
                }
            }
            return res.status(200).json(dataToSend)
        } catch (error) {
            return res.status(400).json(error.toString())
        }
    })
};
