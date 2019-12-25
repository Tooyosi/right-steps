const express = require('express');
const router = express.Router({ mergeParams: true });
const jwt = require('jsonwebtoken');
const middleware = require('../middleware/middleware')


module.exports = {
    post: ('/', middleware.validateBody,  (req, res)=>{
        let {name, email, gender, dob, country, state, username, password, sponsor} = req.body;
            const token = jwt.sign(
                req.body,
                'userdetails',
                { expiresIn: '3 hours' }
              );
              res.cookie('token', token, { httpOnly: true })
                .status(200)
                .send(req.body);
        
    })
};
