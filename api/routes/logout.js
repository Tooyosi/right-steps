const express = require('express');
const router = express.Router({ mergeParams: true });
const loginController = require("../controllers/loginController")
const middleware = require("./../middleware/middleware")

router.post('/', middleware.withAuth, loginController.logout)

module.exports = router;
