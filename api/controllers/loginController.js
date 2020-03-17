const express = require('express');
const router = express.Router({ mergeParams: true });
const jwt = require('jsonwebtoken');
const models = require('../connections/sequelize')
const { logger } = require('./../loggers/logger')
const md5 = require('md5')

module.exports = {
    post: ('/', async (req, res) => {
        // let { username, password } = req.body;
        let username = req.body.username.trim()
        let password = Number(req.body.password.trim())
        models.User.belongsTo(models.Role, { foreignKey: "role_id" })

        try {
            let user = await models.User.findOne({
                where: {
                    username: username
                },
                include: [{
                    model: models.Role,
                }]
            })
            if (user != null && user != undefined) {
                if (user.password.trim() == md5(password)) {
                    const token = jwt.sign(
                        user.dataValues,
                        'userdetails',
                        { expiresIn: '3 hours' }
                    );
                    let updatedUser = await user.update({
                        last_login_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
                        token: token.substring(0, 200)
                    })

                    return res.cookie('token', token, { maxAge: 33360000, httpOnly: true })
                        .status(200)
                        .send(user.dataValues);
                } else {
                    logger.error(`Username: ${username} logged in with invalid credentials`)
                    return res.status(400).send("Username Or Password Incorrect")
                }
            } else {
                logger.error(`Username: ${username} logged in with invalid credentials`)
                return res.status(400).send("Username Or Password Incorrect")
            }

        } catch (error) {
            logger.error(error.toString())
        }
    }),

    logout: ('/', async (req, res) => {
        let { userId } = req.body
        try {
            let user = await models.User.findOne({
                where: {
                    user_id: userId,
                },
            })
            if (user != null && user != undefined) {
                let updatedUser = await user.update({
                    token: null
                })

                return res.status(200)
                    .send('Success');
            } else {
                return res.status(400).send("Failed")
            }

        } catch (error) {
            logger.error(error.toString())
            return res.status(400).send(error.toString())

        }
    })
};
