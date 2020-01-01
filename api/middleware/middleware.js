const jwt = require('jsonwebtoken');

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

            jwt.verify(token, 'userdetails', (err, decoded) => {
                if (err) {
                  return res.status(401).send({
                    message: 'Unauthorized User',
                  });
                }
                req.user = decoded;
                req.token = token;
                next();
              });
    }
}