const express = require('express');
const router = express.Router({ mergeParams: true });
const jwt = require('jsonwebtoken');
const models = require('../connections/sequelize')
const {logger} = require('./../loggers/logger')
module.exports = {
    post: ('/', async (req, res)=>{
        let {username, password} = req.body;
        try {
            let user = await models.User.findOne({
                where:{
                    username: username,
                    password: password
                }
            })
            if(user != null || user != undefined){
                const token = jwt.sign(
                    user.dataValues,
                    'userdetails',
                    { expiresIn: '3 hours' }
                  );
                 let updatedUser = await  user.update({
                    last_login_date: new Date().toISOString().slice(0, 19).replace('T', ' ')
                  })
                  return res.cookie('token', token, { httpOnly: true })
                    .status(200)
                    .send(user.dataValues);
            }else{
                logger.error(`Username: ${username} logged in with invalid credentials`)
                return res.status(401).send("Username Or Password Incorrect")
            }
            
        } catch (error) {
            logger.error(error.toString())
        }
    })
};
