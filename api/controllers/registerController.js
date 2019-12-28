const express = require('express');
const models = require('../connections/sequelize')
const {logger} = require('./../loggers/logger')

module.exports = {
    post: ('/',  async (req, res) => {
        let {firstname, lastname, phone, email, gender, dob, country, state, username, password, role } = req.body;
        try {
            let newUSer = await models.User.build({
                firstname: firstname,
                lastname : lastname,
                username: username,
                email_address: email,
                role_id: role,
                gender: gender,
                dob: dob,
                phone_no: phone,
                country: country,
                state: state,
                status: 0,
                password: password,
                date_created: Date.now(),
                last_login_date: Date.now(),
            }).save()
            
            res.status(201)
                .send("User Created Successfully");
        } catch (error) {
            console.log(error.original? error.original : error)
            logger.info(error.original? error.original.toString() : error.toString())
            res.status(400).send(error.original? error.original.toString() : error.toString())
        }

    })
};
