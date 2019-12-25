const express = require('express');
const router = express.Router({ mergeParams: true });
const jwt = require('jsonwebtoken');

let user = {
    id: "nklkljkh",
	username: "test",
	password : "test"
}

module.exports = {
    post: ('/', (req, res)=>{
        let {username, password} = req.body;
        if(username == user.username && password == user.password){
            const token = jwt.sign(
                {
                  id: user.id,
                  username: user.username,
                },
                'userdetails',
                { expiresIn: '3 hours' }
              );
              res.cookie('token', token, { httpOnly: true })
                .status(200)
                .send(req.body);
        }else{
            res.status(401).send("Wrong credentials")
        }
    })
};
