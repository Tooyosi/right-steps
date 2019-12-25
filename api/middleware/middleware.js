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
    }
}