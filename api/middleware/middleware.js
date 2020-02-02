const jwt = require('jsonwebtoken');
const models = require('../connections/sequelize')
module.exports = {
    validateBody: (req, res, next) => {
        let err = []
        let password;
        let confirmPassword;
        Object.entries(req.body).forEach((item) => {
            if (item[1].trim() === "") {
                err.push(`${item[0]} is empty`)
            }
        })
        if (err.length > 0) {
            return res.status(401).send(err)
        } else {
            return next()
        }
    },

    withAuth: (req, res, next) => {
        const token =
            req.body.token ||
            req.query.token ||
            req.headers['x-access-token'] ||
            req.cookies.token;

            jwt.verify(token, 'userdetails', async (err, decoded) => {
                if (err) {
                  return res.status(401).send({
                    message: 'Unauthorized User',
                  });
                }
                let user = await models.User.findOne({
                    where: {
                        user_id: decoded.user_id
                    }
                })

                if(token.substring(0, 200) == user.token){
                    req.user = decoded;
                    req.token = token;
                    next();
                } else {
                    res.status(401).send('Invalid Session')
                }
              });
    }
}