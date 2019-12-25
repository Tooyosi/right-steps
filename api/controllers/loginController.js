const express = require('express');
const router = express.Router({ mergeParams: true });
const jwt = require('jsonwebtoken');
const models = require('../connections/sequelize')

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
            console.log(user)
            if(user != null || user != undefined){
                const token = jwt.sign(
                    user.dataValues,
                    'userdetails',
                    { expiresIn: '3 hours' }
                  );
                  res.cookie('token', token, { httpOnly: true })
                    .status(200)
                    .send(user.dataValues);
            }else{
                res.status(401).send("Username Or Password Incorrect")
            }
            
        } catch (error) {
            console.log(error)
        }
    })
};
