const express = require('express');
const router = express.Router({ mergeParams: true });
const jwt = require('jsonwebtoken');
const middleware = require('../middleware/middleware')
const models = require('../connections/sequelize')

module.exports = {
    post: ('/',  async (req, res) => {
        let { name, email, gender, dob, country, state, username, password, sponsor } = req.body;
        try {
            let newUSer = await models.User.build({
                name: name,
                username: username,
                email: email,
                gender: gender,
                dob: dob,
                country: country,
                state: state,
                password: password,
                sponsor_id: sponsor.trim() !== ""? sponsor : null,
                createdAt: Date.now()
            }).save()
            const token = jwt.sign(
                newUSer,
                'userdetails',
                { expiresIn: '3 hours' }
            );
            res.cookie('token', token, { httpOnly: true })
                .status(200)
                .send(newUSer);
        } catch (error) {
            console.log(error.original.toString())
            res.status(400).send(error.original? error.original.toString() : error.toString())
        }

    })
};
